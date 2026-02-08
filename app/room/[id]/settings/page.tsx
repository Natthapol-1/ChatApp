import { getRoom } from '@/app/actions/rooms';
import RoomInviteCodeForm from '@/components/rooms/RoomInviteCodeForm';

export default async function RoomSettingPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: roomId } = await params;
  const room = await getRoom(roomId);
  if (!room) throw new Error('Room not found');
  return (
    <>
      Setting
      <RoomInviteCodeForm
        inviteCode={room.inviteCode}
        roomId={room.id}
      ></RoomInviteCodeForm>
    </>
  );
}
