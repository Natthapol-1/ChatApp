'use client';
import { pusherClient } from '@/lib/pusher';
import { useEffect, useState } from 'react';

export default function ChatWindow({
  initialMessages
}: {
  initialMessages: any[];
}) {
  const [messages, setMessages] = useState(initialMessages);

  useEffect(() => {
    const channel = pusherClient.subscribe('chat-channel');

    channel.bind('new-message', (data: any) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      pusherClient.unsubscribe('chat-channel');
    };
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {messages.map((m) => (
        <div key={m.id} className="p-2 bg-black-100 rounded border">
          <span className="font-bold">{m.sender}: </span>
          {m.content}
        </div>
      ))}
    </div>
  );
}
