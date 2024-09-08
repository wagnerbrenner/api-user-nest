import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { createUserMock } from '../__mocks__/createUser.mock';
import {
  updatePasswordInvalidMock,
  updatePasswordMock,
} from '../__mocks__/update-user.mock';
import { userEntityMock } from '../__mocks__/user.mock';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return user in findUserByEmail', async () => {
    const user = await service.findUserByEmail(userEntityMock.email);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error in findUserByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findUserByEmail(userEntityMock.email)).rejects.toThrow();
  });
  it('should return error in findUserByEmail (error DB)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(service.findUserByEmail(userEntityMock.email)).rejects.toThrow();
  });

  it('should return user in findUserById', async () => {
    const user = await service.findUserById(userEntityMock.id);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error in findUserById', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findUserById(userEntityMock.id)).rejects.toThrow();
  });

  it('should return error in findUserById (error DB)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(service.findUserById(userEntityMock.id)).rejects.toThrow();
  });

  it('should return error if user exist', async () => {
    expect(service.createUser(createUserMock)).rejects.toThrow();
  });

  it('should return error if user not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    const user = await service.createUser(createUserMock);

    expect(user).toEqual(userEntityMock);
  });

  it('should return user in updatePassword', async () => {
    const user = await service.updatePassword(
      userEntityMock.id,
      updatePasswordMock,
    );

    expect(user).toEqual(userEntityMock);
  });

  it('should return invalid password in error', async () => {
    expect(
      service.updatePassword(userEntityMock.id, updatePasswordInvalidMock),
    ).rejects.toThrow();
  });

  it('should return error in user not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.updatePassword(userEntityMock.id, updatePasswordMock),
    ).rejects.toThrow();
  });

  it('should return user in delete', async () => {
    await service.deleteUser(userEntityMock.id);

    expect(userRepository.delete).toBeCalled();
  });

  it('should return error in delete', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.deleteUser(userEntityMock.id)).rejects.toThrow();
  });
});
