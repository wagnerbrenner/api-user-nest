import { userEntityMock } from '../../user/__mocks__/user.mock';
import { jwtMock } from '../__mocks__/jwt.mock';
import { ReturnLoginDto } from '../dtos/returnLogin.dto';

export const returnLoginMock: ReturnLoginDto = {
  accessToken: jwtMock,
  user: userEntityMock,
};
