import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/userId.decorator';
import { CreateUserDto } from './dtos/createUser.dto';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { UserType } from './enum/user-type.enum';
import { UserService } from './user.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles(UserType.ADMIN)
  @Get('/all')
  async getAllUsers(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUsers()).map(
      (userEntity) => new ReturnUserDto(userEntity),
    );
  }

  @Get('/:userId')
  async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.findUserById(userId));
  }

  @Roles(UserType.ADMIN, UserType.USER, UserType.ROOT)
  @Get()
  async getInfoUser(@UserId() userId: number): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.findUserById(userId));
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }
  @Roles(UserType.ROOT)
  @Post('/admin')
  @UsePipes(ValidationPipe)
  async createAdmin(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser, UserType.ADMIN);
  }

  @Roles(UserType.USER, UserType.ADMIN, UserType.ROOT)
  @Patch()
  @UsePipes(ValidationPipe)
  async updatePasswordUser(
    @UserId() userId: number,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    return this.userService.updatePassword(userId, updatePasswordDto);
  }

  @Roles(UserType.ADMIN, UserType.ROOT)
  @Delete('/:userId')
  async deleteUser(@Param('userId') userId: number): Promise<void> {
    return this.userService.deleteUser(userId);
  }
}
