import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class TaskListCreateRequest {
  @ApiProperty({
    description: '任务列表名称',
    example: '默认列表',
  })
  @IsNotEmpty({
    message: '任务列表名称不能为空',
  })
  @MinLength(4, {
    message: '任务列表名称长度不能小于4个字符',
  })
  name: string;
}
