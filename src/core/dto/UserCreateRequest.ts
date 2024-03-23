import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateRequest {
  @IsNotEmpty()
  @ApiProperty({ description: '用户名' })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ description: '密码' })
  password: string;
}
