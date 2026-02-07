'use client';
import { Room } from '@/generated/prisma/client';
import Link from 'next/link';
import { MessageSquare, Hash } from 'lucide-react';
import { DeleteRoomButton } from './DeleteRoomButton';

export default function RoomsList({ rooms }: { rooms: Room[] }) {
  if (rooms.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-800/20 rounded-2xl border-2 border-dashed border-gray-800">
        <MessageSquare className="mx-auto h-12 w-12 text-gray-600 mb-4" />
        <p className="text-gray-400">No rooms joined yet. Create one above!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {rooms.map((room) => (
        <div
          key={room.id}
          className="flex items-center bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-blue-500/30 rounded-2xl transition-all duration-200 overflow-hidden"
        >
          {/* Main Link Area */}
          <Link
            href={`/chat/${room.id}`}
            className="flex-1 flex items-center p-5 gap-4 min-w-0"
          >
            <div className="bg-blue-600/10 p-3 rounded-xl">
              <Hash className="h-6 w-6 text-blue-500" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-white truncate">
                {room.name}
              </h3>
              <p className="text-sm text-gray-400 truncate">Join chat</p>
            </div>
          </Link>

          {/* Delete Action Area */}
          <div className="pr-4">
            <DeleteRoomButton roomId={room.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
