import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email of the user',
    example: 'example@email.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'password',
  })
  @IsString()
  password: string;
}
