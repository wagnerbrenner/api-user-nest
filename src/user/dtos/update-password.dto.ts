import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    description: 'New password of the user',
    example: 'password',
  })
  @IsString()
  newPassword: string;

  @ApiProperty({
    description: 'Last password of the user',
    example: 'password',
  })
  @IsString()
  lastPassword: string;
}
