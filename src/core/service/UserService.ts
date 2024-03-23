import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import { UserCreateRequest } from '../dto/UserCreateRequest';
import * as bcrypt from 'bcrypt';
import { SALT_ROUND } from '../constant/use';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  async create(userCreateRequest: UserCreateRequest) {
    // 用户创建
    const existedUser = await this.findByUsername(userCreateRequest.username);
    if (existedUser) {
      throw new HttpException('该用户名已被占用', 400);
    }

    const user = new User();
    user.username = userCreateRequest.username;
    user.salt = await bcrypt.genSalt(SALT_ROUND);
    user.encryptedPassword = await bcrypt.hash(
      userCreateRequest.password,
      user.salt,
    );
    return this.userRepository.save(user);
  }
}
