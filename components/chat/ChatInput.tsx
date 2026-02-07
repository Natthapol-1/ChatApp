'use client';
import { useEffect, useRef, useState } from 'react';
import { sendMessage, setTyping } from '@/app/actions/chat';
import SubmitButton from '../SubmitButton';
import { pusherClient } from '@/lib/pusher';

export default function ChatInput({
  userName,
  roomId
}: {
  userName: string;
  roomId: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState('');
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    const channel = pusherClient.subscribe(`chat-channel-${roomId}`);

    channel.bind('client-typing', (data: { user: string }) => {
      setTypingUser(data.user);
      setIsTyping(true);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // 3. Set the NEW timeout and store it in the ref
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 3000);
    });

    return () => {
      pusherClient.unsubscribe(`chat-channel-${roomId}`);
    };
  }, []);
  return (
    <div>
      {isTyping && (
        <p className="text-xs text-gray-500 animate-pulse">
          {typingUser != userName && typingUser + ' is typing...'}
        </p>
      )}
      <form
        ref={formRef}
        action={async (formData) => {
          formRef.current?.reset();
          await sendMessage(formData, roomId);
        }}
        className="p-4 bg-gray-800 rounded-lg flex gap-2"
      >
        <input
          name="message"
          onChange={setTyping.bind(null, userName, roomId)}
          className="flex-1 bg-transparent outline-none border-none text-white"
          placeholder="Type a message..."
          required
        />
        <SubmitButton text="Send"></SubmitButton>
      </form>
    </div>
  );
}
