import z from 'zod';
import {
  MAX_USER_NAME_LENGTH,
  MIN_USER_NAME_LENGTH,
} from '../users/users.constants';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from './auth.constants';

export const loginInputSchema = z.object({
  email: z.email(),
  password: z.string().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export const signupInputSchema = z.object({
  email: z.email(),
  password: z.string().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
  fullName: z.string().min(MIN_USER_NAME_LENGTH).max(MAX_USER_NAME_LENGTH),
});

export type SignupInput = z.infer<typeof signupInputSchema>;

export const userSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  createdAt: z.iso.datetime(),
  fullName: z.string().min(MIN_USER_NAME_LENGTH).max(MAX_USER_NAME_LENGTH),
});

export type User = z.infer<typeof userSchema>;
