'use client';
import { useEffect, useRef, useState } from 'react';
import { pusherClient } from '@/lib/pusher';
import { User } from '@/generated/prisma/client';
import { MessageWithUser } from '@/lib/type';
import { deleteMessage } from '@/app/actions/chat';

export default function ChatWindow({
  initialMessages,
  user,
  roomId
}: {
  initialMessages: MessageWithUser[];
  user: User;
  roomId: string;
}) {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const channel = pusherClient.subscribe(`chat-channel-${roomId}`);

    channel.bind('new-message', (data: any) => {
      setMessages((prev) => [...prev, data]);
    });
    channel.bind('delete-message', (data: any) => {
      setMessages((prev) => prev.filter((p) => p.id != data.message));
    });

    return () => {
      pusherClient.unsubscribe(`chat-channel-${roomId}`);
    };
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
      {messages.map((m) => {
        const isMe = m.userId === user.id;

        return (
          <div
            key={m.id}
            className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} group animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            {/* Sender Name & Time */}
            <div
              className={`flex items-center gap-2 mb-1 px-1 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <span className="text-sm font-semibold text-gray-200">
                {isMe ? 'You' : m.user.name}
              </span>
              <span className="text-[10px] text-gray-500">
                {new Date(m.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>

            {/* Message Bubble */}
            <div className="relative max-w-[80%] md:max-w-[70%]">
              <div
                className={`p-3 text-sm leading-relaxed shadow-lg ${
                  isMe
                    ? 'bg-blue-600 text-white rounded-2xl rounded-tr-none'
                    : 'bg-gray-800 text-gray-200 rounded-2xl rounded-tl-none'
                }`}
              >
                {m.content}
              </div>

              {/* Unsend Button - visible on hover */}
              {isMe && (
                <button
                  onClick={deleteMessage.bind(null, m.id, roomId)}
                  className="absolute -left-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-red-400 hover:text-red-300 font-medium bg-red-500/10 px-2 py-1 rounded"
                >
                  Unsend
                </button>
              )}
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} className="h-4" />
    </div>
  );
}
