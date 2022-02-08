import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import UserDTO from './types/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(user: UserDTO) {
    const encryptedPassword = await this.encryptPassword(user.password);

    return this.userRepository.save(
      this.userRepository.create({ ...user, password: encryptedPassword }),
    );
  }

  private async encryptPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
