import prisma from '@/lib/prisma';
import { User } from '@clerk/nextjs/server';

export default async function syncUser(user: User) {
  if (!user) {
    return null;
  }
  return await prisma.user.upsert({
    where: { clerkId: user.id },
    update: {},
    create: {
      clerkId: user.id,
      email: user.emailAddresses[0].emailAddress,
      name: user.firstName || user.emailAddresses[0].emailAddress
    }
  });
}
