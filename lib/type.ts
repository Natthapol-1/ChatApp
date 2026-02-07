import { Prisma } from '@/generated/prisma/client';

// This tells Prisma: "I want a Message, but I also want to include the User object"
export type MessageWithUser = Prisma.MessageGetPayload<{
  include: { user: true };
}>;
