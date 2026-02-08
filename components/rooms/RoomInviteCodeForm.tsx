// components/rooms/RoomInviteCodeForm.tsx
'use client'; // This must be a client component for interactivity

import { resetInviteCode } from '@/app/actions/rooms';
import { useState } from 'react';
import { RefreshCw, Copy, Check } from 'lucide-react';

export default function RoomInviteCodeForm({
  roomId,
  inviteCode
}: {
  roomId: string;
  inviteCode: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleReset = async () => {
    if (confirm('Resetting will invalidate the old link. Continue?')) {
      await resetInviteCode(roomId);
    }
  };

  const copyToClipboard = () => {
    const url = `${window.location.origin}/join/${inviteCode}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 space-y-4">
      <h2 className="text-lg font-semibold text-white">Invite Link</h2>

      <div className="flex gap-2">
        <input
          readOnly
          value={`${window.location.origin}/join/${inviteCode}`}
          className="flex-1 bg-[#0d1117] border border-gray-700 rounded-xl px-4 py-2 text-sm text-gray-400 outline-none"
        />

        <button
          onClick={copyToClipboard}
          className="p-2 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors"
        >
          {copied ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <Copy className="w-5 h-5 text-gray-400" />
          )}
        </button>

        <button
          onClick={handleReset}
          className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-colors group"
          title="Reset Link"
        >
          <RefreshCw className="w-5 h-5 text-red-500 group-active:rotate-180 transition-transform" />
        </button>
      </div>

      <p className="text-xs text-gray-500 italic">
        Anyone with this link can join this room.
      </p>
    </div>
  );
}
