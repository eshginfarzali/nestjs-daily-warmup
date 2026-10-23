import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

/** In-memory store; data is lost on restart. */
@Injectable()
export class UsersService {
  private readonly users = new Map<string, User>();

  findAll(): User[] {
    return [...this.users.values()];
  }

  findOne(id: string): User {
    const user = this.users.get(id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  create(dto: CreateUserDto): User {
    this.assertEmailIsFree(dto.email);
    const user: User = {
      id: randomUUID(),
      username: dto.username,
      email: dto.email,
      createdAt: new Date().toISOString(),
    };
    this.users.set(user.id, user);
    return user;
  }

  update(id: string, dto: UpdateUserDto): User {
    const user = this.findOne(id);
    if (dto.email && dto.email !== user.email) {
      this.assertEmailIsFree(dto.email);
    }
    const updated = { ...user, ...dto };
    this.users.set(id, updated);
    return updated;
  }

  remove(id: string): void {
    this.findOne(id);
    this.users.delete(id);
  }

  private assertEmailIsFree(email: string) {
    if (this.findAll().some((user) => user.email === email)) {
      throw new ConflictException(`Email ${email} is already registered`);
    }
  }
}
