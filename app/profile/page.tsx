import ProfileWindow from '@/components/profile/ProfileWindow';
import { currentUser } from '@clerk/nextjs/server';
import requireUser from '../actions/requireUser';
import findUser from '../actions/findUser';

export default async function ProfilePage() {
  const user = await findUser();

  return (
    <>
      <ProfileWindow user={user}></ProfileWindow>
    </>
  );
}
