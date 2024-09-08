import { Test, TestingModule } from '@nestjs/testing';

import { userEntityMock } from '../../user/__mocks__/user.mock';
import { createUserMock } from '../__mocks__/createUser.mock';
import { updatePasswordMock } from '../__mocks__/update-user.mock';
import { ReturnUserDto } from '../dtos/returnUser.dto';
import { UserType } from '../enum/user-type.enum';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn().mockResolvedValue(userEntityMock),
            getAllUsers: jest.fn().mockResolvedValue([userEntityMock]),
            findUserById: jest.fn().mockResolvedValue(userEntityMock),
            updatePassword: jest.fn().mockResolvedValue(userEntityMock),
            deleteUser: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return user Entity in createUser', async () => {
    const user = await controller.createUser(createUserMock);

    expect(user).toEqual(userEntityMock);
  });

  it('should return user Entity in createUser', async () => {
    const spy = jest.spyOn(userService, 'createUser');
    const user = await controller.createAdmin(createUserMock);

    expect(user).toEqual(userEntityMock);
    expect(spy.mock.calls[0][1]).toEqual(UserType.ADMIN);
  });

  it('should return ReturnUser in getAllUser', async () => {
    const users = await controller.getAllUsers();

    expect(users).toEqual([
      {
        id: userEntityMock.id,
        name: userEntityMock.name,
        email: userEntityMock.email,
        phone: userEntityMock.phone,
        cpf: userEntityMock.cpf,
      },
    ]);
  });

  it('should return ReturnUser in getUserById', async () => {
    const user = await controller.getUserById(userEntityMock.id);

    expect(user).toEqual({
      id: userEntityMock.id,
      name: userEntityMock.name,
      email: userEntityMock.email,
      phone: userEntityMock.phone,
      cpf: userEntityMock.cpf,
    });
  });

  it('should return UserEntity in updatePasswordUser', async () => {
    const user = await controller.updatePasswordUser(
      userEntityMock.id,
      updatePasswordMock,
    );

    expect(user).toEqual(userEntityMock);
  });

  it('should return ReturnUserEntity in getInfoUser', async () => {
    const user = await controller.getInfoUser(userEntityMock.id);

    expect(user).toEqual(new ReturnUserDto(userEntityMock));
  });

  it('should return void in deleteUser', async () => {
    const user = await controller.deleteUser(userEntityMock.id);

    expect(user).toBeUndefined();
  });
});
