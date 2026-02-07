'use server';
import prisma from '@/lib/prisma';
import findUser from '../actions/findUser';
import RoomsList from '@/components/rooms/RoomsList';
import SubmitButton from '@/components/SubmitButton';
import { addRoom } from '../actions/rooms';

export default async function RoomsPage() {
  const user = await findUser();
  const rooms = await prisma.room.findMany({
    where: {
      members: {
        some: {
          userId: user.id
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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Your Rooms
          </h1>
          <p className="text-gray-400 mt-1">
            Select a channel to start chatting
          </p>
        </div>

        {/* Create Room Form */}
        <form
          action={addRoom}
          className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-xl border border-gray-700 focus-within:border-blue-500 transition-all"
        >
          <input
            type="text"
            name="name"
            placeholder="New room name..."
            required
            className="bg-transparent border-none outline-none px-3 py-1 text-sm text-white placeholder:text-gray-500 w-full md:w-48"
          />
          <SubmitButton text="Create" />
        </form>
      </div>

      {/* Rooms Display Section */}
      <div className="grid grid-cols-1 gap-4">
        <RoomsList rooms={rooms} />
      </div>
    </div>
  );
}
