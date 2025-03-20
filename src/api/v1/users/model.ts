import { hash } from 'bcryptjs';

export const fields = [
  'id',
  'name',
  'email',
  'password',
  'createdAt',
  'updatedAt',
];

export const encryptPassword = (password: string) => {
  return hash(password, 10);
};
