import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import { UserCreateRequest } from '../dto/UserCreateRequest';
import * as bcrypt from 'bcrypt';
import { SALT_ROUND } from '../constant/user';
import { UserUpdateRequest } from '../dto/UserUpdateRequest';

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
    const salt = await bcrypt.genSalt(SALT_ROUND);
    user.encryptedPassword = await bcrypt.hash(
      userCreateRequest.password,
      salt,
    );
    return this.userRepository.save(user);
  }

  async get(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, userUpdateRequest: UserUpdateRequest) {
    const user = await this.get(id);
    user.username = userUpdateRequest.username;
    return this.userRepository.save(user);
  }
}
