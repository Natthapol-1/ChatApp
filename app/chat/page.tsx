import prisma from '@/lib/prisma';
import ChatWindow from './ChatWindow';
import { sendMessage } from '@/app/actions/chat';

export default async function ChatPage() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'asc' }
  });

  return (
    <main className="p-8">
      <h1 className="text-2xl mb-4">Real-time Chat</h1>
      <ChatWindow initialMessages={messages} />

      <form action={sendMessage} className="mt-4 flex gap-2">
        <input
          name="message"
          className="border p-2 flex-1 rounded"
          placeholder="Message..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </form>
    </main>
  );
}
