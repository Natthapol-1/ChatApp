import { currentUser, User } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function requireUser() {
  const user = await currentUser();
  if (!user) {
    redirect('/');
  }
  return user;
}
