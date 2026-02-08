'use client';

import { useTransition } from 'react';
import { JoinRoom } from '@/app/actions/rooms';

export default function JoinButton({ inviteCode }: { inviteCode: string }) {
  const [isPending, startTransition] = useTransition();

  const handleJoin = () => {
    startTransition(async () => {
      await JoinRoom(inviteCode);
    });
  };

  return (
    <button
      onClick={handleJoin}
      disabled={isPending}
      className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition-all hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isPending ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
            {/* Simple spinner icon */}
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Joining...
        </span>
      ) : (
        'Join Room'
      )}
    </button>
  );
}
