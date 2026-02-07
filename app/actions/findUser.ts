import prisma from '@/lib/prisma';
import requireUser from './requireUser';

export default async function findUser() {
  const clerkUser = await requireUser();
  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser.id
    }
  });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}
