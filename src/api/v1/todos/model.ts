import { z } from 'zod';
import validator from 'validator';

export const TodoSchema = z
  .object({
    title: z
      .string()
      .trim()
      .refine(
        (value) => validator.isAlphanumeric(validator.blacklist(value, ' ')),
        { message: 'title must contains only letters, numbers and spaces' },
      )
      .transform((value = '') => validator.escape(value)),
    description: z
      .string()
      .trim()
      .transform((value = '') => validator.escape(value))
      .optional(),
    completed: z.boolean().default(false),
    dueDate: z.string().optional(),
  })
  .strict();

export const fields = [
  'id',
  'createdAt',
  'updatedAt',
  ...Object.keys(TodoSchema.shape),
];
