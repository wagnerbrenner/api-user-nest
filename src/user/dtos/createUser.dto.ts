import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'example@email.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '99999999999',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'CPF of the user',
    example: '99999999999',
  })
  @IsString()
  cpf: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'password',
  })
  @IsString()
  password: string;
}
