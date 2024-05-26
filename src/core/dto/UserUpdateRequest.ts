import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateRequest {
  @IsNotEmpty()
  @ApiProperty({ description: '用户名' })
  username: string;
}
