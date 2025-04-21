import { compare, hash } from 'bcryptjs';
import { z } from 'zod';

export const UserSchema = z
  .object({
    name: z.string().trim(),
    email: z.string().trim().email().toLowerCase(),
    password: z.string().trim().min(6).max(16),
  })
  .strict();

export const fields = [
  'id',
  'createdAt',
  'updatedAt',
  ...Object.keys(UserSchema.shape),
];

export const encryptPassword = (password: string) => {
  return hash(password, 10);
};

export const verifyPassword = (password: string, encryptedPassword: string) => {
  return compare(password, encryptedPassword);
};
