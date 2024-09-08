import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { userEntityMock } from '../../user/__mocks__/user.mock';
import { ReturnUserDto } from '../../user/dtos/returnUser.dto';
import { UserService } from '../../user/user.service';
import { jwtMock } from '../__mocks__/jwt.mock';
import { loginUserMock } from '../__mocks__/login-user.mock';
import { AuthService } from '../auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findUserByEmail: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: () => jwtMock,
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return if password and email valid', async () => {
    const user = await service.login(loginUserMock);

    expect(user).toEqual({
      accessToken: jwtMock,
      user: new ReturnUserDto(userEntityMock),
    });
  });

  it('should return if password invalid and email valid', async () => {
    expect(
      service.login({ ...loginUserMock, password: '123' }),
    ).rejects.toThrow();
  });

  it('should return if password valid and email invalid', async () => {
    jest.spyOn(userService, 'findUserByEmail').mockResolvedValue(undefined);

    expect(service.login(loginUserMock)).rejects.toThrow();
  });

  it('should return error in UserService', async () => {
    jest
      .spyOn(userService, 'findUserByEmail')
      .mockRejectedValueOnce(new Error());

    expect(service.login(loginUserMock)).rejects.toThrow();
  });
});
