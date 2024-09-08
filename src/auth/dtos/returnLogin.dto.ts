import { ReturnUserDto } from '../../user/dtos/returnUser.dto';

export interface ReturnLoginDto {
  user: ReturnUserDto;
  accessToken: string;
}
