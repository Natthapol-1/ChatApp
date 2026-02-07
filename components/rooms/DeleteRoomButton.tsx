'use client';
import { deleteRoom } from '@/app/actions/rooms';
import { Trash2 } from 'lucide-react';

export function DeleteRoomButton({ roomId }: { roomId: string }) {
  return (
    <button
      onClick={async (e) => {
        // Still good to stop propagation just in case,
        // though flex layout usually handles this better.
        e.preventDefault();
        if (confirm('Are you sure you want to delete this room?')) {
          await deleteRoom(roomId);
        }
      }}
      className="p-3 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all duration-200"
      title="Delete Room"
    >
      <Trash2 className="h-5 w-5" />
    </button>
  );
}
