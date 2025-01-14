import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TokenCreateRequest {
  @IsNotEmpty({ message: '用户名不能为空' })
  @ApiProperty({ description: '用户名' })
  username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @ApiProperty({ description: '用户名' })
  password: string;
}
