import { UpdatePasswordDto } from '../dtos/update-password.dto';

export const updatePasswordMock: UpdatePasswordDto = {
  lastPassword: '123456',
  newPassword: '02040608',
};

export const updatePasswordInvalidMock: UpdatePasswordDto = {
  lastPassword: '654321',
  newPassword: '03050709',
};
