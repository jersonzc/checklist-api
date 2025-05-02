import { compare, hash } from 'bcryptjs';
import { z } from 'zod';

export const PersonSchema = z
  .object({
    name: z.string().trim(),
  })
  .strict();

export const LoginSchema = z
  .object({
    email: z.string().trim().email().toLowerCase(),
    password: z.string().trim().min(6).max(16),
  })
  .strict();

export const UserSchema = PersonSchema.merge(LoginSchema);

export const fields = [
  'createdAt',
  'updatedAt',
  ...Object.keys(PersonSchema.shape),
  'email',
];

export const encryptPassword = (password: string) => {
  return hash(password, 10);
};

export const verifyPassword = (password: string, encryptedPassword: string) => {
  return compare(password, encryptedPassword);
};
