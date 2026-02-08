'use server';
import prisma from '@/lib/prisma';
import findUser from './findUser';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';
import { redirect } from 'next/navigation';
import { Role } from '@/generated/prisma/enums';

export async function addRoom(formData: FormData) {
  const roomName = formData.get('name') as string;
  const user = await findUser();
  if (!roomName || !user) return;
  await prisma.room.create({
    data: {
      name: roomName,
      members: {
        create: {
          userId: user.id,
          role: Role.ADMIN
        }
      }
    },
    include: {
      members: {
        include: {
          user: true
        }
      }
    }
  });
  revalidatePath('/room');
}

export async function getRoom(roomId: string) {
  const room = await prisma.room.findUnique({
    where: { id: roomId }
  });
  return room;
}

export async function deleteRoom(roomId: string) {
  await prisma.room.delete({
    where: { id: roomId }
  });
  revalidatePath('/room');
  redirect('/rooms');
}

export async function resetInviteCode(roomId: string) {
  'use server';
  const newInviteCode = uuidv4();
  await prisma.room.update({
    where: { id: roomId },
    data: {
      inviteCode: newInviteCode
    }
  });
  revalidatePath(`/room/${roomId}/settings`);
}

export async function getRoomByInviteCode(inviteCode: string) {
  const room = await prisma.room.findUnique({
    where: {
      inviteCode: inviteCode
    }
  });
  return room;
}

export async function JoinRoom(inviteCode: string) {
  const room = await getRoomByInviteCode(inviteCode);
  if (!room) throw new Error('Room not found');
  const user = await findUser();
  const roomMember = await prisma.roomMember.findUnique({
    where: {
      userId_roomId: {
        userId: user.id,
        roomId: room.id
      }
    }
  });
  if (!roomMember) {
    await prisma.roomMember.create({
      data: {
        role: Role.USER,
        userId: user.id,
        roomId: room.id
      }
    });
  }
  redirect(`/room/${room.id}`);
}
