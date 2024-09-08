/* eslint-disable import/order */
import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { createPasswordHashed } from '../../utils/createPassword';
import { validatePassword } from '../../utils/validatePassword';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { UserType } from './enum/user-type.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
    userType?: number,
  ): Promise<UserEntity> {
    const user = await this.findUserByEmail(createUserDto.email).catch(
      () => undefined,
    );

    if (user) {
      throw new BadGatewayException('email registered in system');
    }
    const passwordHashed = await createPasswordHashed(createUserDto.password);

    return this.userRepository.save({
      ...createUserDto,
      typeUser: userType ? userType : UserType.USER,
      password: passwordHashed,
    });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(`email ${email} not found`);
    }

    return user;
  }

  async updatePassword(
    userId: number,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const user = await this.findUserById(userId);

    const passwordHashed = await createPasswordHashed(
      updatePasswordDto.newPassword,
    );

    const isMatch = await validatePassword(
      updatePasswordDto.lastPassword,
      user.password,
    );

    if (!isMatch) {
      throw new BadGatewayException('Last password is invalid');
    }

    return this.userRepository.save({
      ...user,
      password: passwordHashed,
    });
  }

  async deleteUser(userId: number): Promise<void> {
    await this.findUserById(userId);

    await this.userRepository.delete(userId);
  }
}
