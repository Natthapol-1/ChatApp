import { getRoomByInviteCode } from '@/app/actions/rooms';
import JoinButton from '@/components/rooms/JoinButton';

export default async function JoinRoomPage({
  params
}: {
  params: { id: string };
}) {
  const { id: inviteCode } = await params;
  const room = await getRoomByInviteCode(inviteCode);

  if (!room) throw new Error('Room not found');

  return (
    <main className="flex min-h-[80vh] items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
        <div className="text-center">
          <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
            Invitation
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {room.name}
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            You've been invited to join this room.
          </p>
        </div>

        <div className="mt-8">
          <JoinButton inviteCode={inviteCode} />
        </div>
      </div>
    </main>
  );
}
