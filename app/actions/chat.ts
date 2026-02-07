'use server';
import prisma from '@/lib/prisma';
import { pusherServer } from '@/lib/pusher';
import findUser from './findUser';

export async function getMessages(roomId: string) {
  const messages = await prisma.message.findMany({
    where: {
      roomId: roomId
    },
    take: 50,
    orderBy: {
      createdAt: 'asc'
    },
    include: {
      user: true
    }
  });
  return messages;
}

export async function sendMessage(formData: FormData, roomId: string) {
  const user = await findUser();
  const content = formData.get('message') as string;
  if (content.length < 1) {
    return;
  }

  const newMessage = await prisma.message.create({
    data: {
      content,
      userId: user.id,
      roomId: roomId
    },
    include: {
      user: true
    }
  });

  await pusherServer.trigger(
    `chat-channel-${roomId}`,
    'new-message',
    newMessage
  );
}

export async function setTyping(username: string, roomId: string) {
  await pusherServer.trigger(`chat-channel-${roomId}`, 'client-typing', {
    user: username
  });
}

export async function deleteMessage(messageId: string, roomId: string) {
  const user = await findUser();
  const message = await prisma.message.findUnique({
    where: { id: messageId }
  });
  if (!message) {
    throw new Error('Message not found');
  }
  if (user.id != message?.userId) {
    throw new Error('Unauthorized user');
  }
  await prisma.message.delete({
    where: { id: message.id }
  });
  await pusherServer.trigger(`chat-channel-${roomId}`, 'delete-message', {
    message: messageId
  });
}
