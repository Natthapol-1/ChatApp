import z from 'zod';

export const ProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address')
});

export type ProfileInput = z.infer<typeof ProfileSchema>;
