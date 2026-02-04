'use server';

import prisma from '@/lib/prisma';
import { pusherServer } from '@/lib/pusher';
import { revalidatePath } from 'next/cache';

export async function sendMessage(formData: FormData) {
  const content = formData.get('message') as string;
  const sender = 'User1'; // You can replace this with auth later

  if (!content) return;

  const newMessage = await prisma.message.create({
    data: {
      content,
      sender
    }
  });
  await pusherServer.trigger('chat-channel', 'new-message', newMessage);

  revalidatePath('/chat');
}
