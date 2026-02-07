'use server';
import prisma from '@/lib/prisma';
import findUser from './findUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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
          role: 'ADMIN'
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
