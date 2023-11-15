import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  create(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.usersRepository.create(createUserInput);
    return this.usersRepository.save(newUser);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneOrFail({
      where: { id } as FindOptionsWhere<User>,
    });
  }

  findUser(name: string) {
    return this.usersRepository.findOneOrFail({
      where: { name } as FindOptionsWhere<User>,
    });
  }

  addProductToOrder(user: User, product: Product) {
    user.orders.push(product);
    return this.usersRepository.save(user);
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with ID: ${id} not found`);
    }

    Object.assign(user, updateUserInput);
    return this.usersRepository.save(user);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
