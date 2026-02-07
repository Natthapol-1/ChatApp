'use server';
import prisma from '@/lib/prisma';
import { ProfileSchema } from '@/lib/validations';

export default async function editUserInfo(
  userId: string,
  email: string,
  name: string
) {
  if (!email || !name) {
    return;
  }
  const validated = ProfileSchema.parse({ email, name });
  const updatedUser = await prisma.user.update({
    where: {
      id: userId
    },
    data: validated
  });
  return updatedUser;
}
