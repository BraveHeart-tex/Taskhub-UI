import z from 'zod';

export const loginInputSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export const signupInputSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export type SignupInput = z.infer<typeof signupInputSchema>;

export const userSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string(),
});

export type UserDto = z.infer<typeof userSchema>;
