import { hash } from 'bcrypt';

export const createPasswordHashed = async (
  password: string,
): Promise<string> => {
  const saltOrRounds = 10;
  return hash(password, saltOrRounds);
};
