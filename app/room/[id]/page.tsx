import ChatInput from '@/components/chat/ChatInput';
import ChatWindow from '@/components/chat/ChatWindow';
import findUser from '../../actions/findUser';
import { getMessages } from '@/app/actions/chat';
import { DeleteRoomButton } from '@/components/rooms/DeleteRoomButton';
import { getRoom } from '@/app/actions/rooms';

// app/chat/[id]/page.tsx
export default async function ChatPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await findUser();
  const { id: roomId } = await params;
  const room = await getRoom(roomId);
  if (!room) throw new Error('Room not found');
  const messages = await getMessages(roomId);

  return (
    // overflow-hidden prevents the whole page from scrolling
    <div className="flex flex-col h-screen bg-[#0b0e14] text-white overflow-hidden">
      <header className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-[#0b0e14]/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600/20 p-2 rounded-lg">
            <span className="text-blue-500 font-bold text-lg leading-none">
              #
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">{room.name}</h1>
        </div>
        <DeleteRoomButton roomId={roomId} />
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-hidden flex flex-col relative">
        <ChatWindow initialMessages={messages} user={user} roomId={roomId} />
      </main>

      {/* Input Section */}
      <footer className="p-4 bg-[#0b0e14] border-t border-gray-800">
        <ChatInput userName={user.name} roomId={roomId} />
      </footer>
    </div>
  );
}
