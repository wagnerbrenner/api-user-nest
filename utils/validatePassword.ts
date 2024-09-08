import { compare } from 'bcrypt';

export const validatePassword = async (
  password: string,
  passwordHashed: string,
): Promise<boolean> => {
  return compare(password, passwordHashed);
};
