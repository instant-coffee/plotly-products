import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ProductsService } from '../products/products.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver(of => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private productsService: ProductsService,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Query(returns => [User])
  users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(returns => User)
  getUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Query(returns => User)
  getUserByName(
    @Args('name', { type: () => String }) name: string,
  ): Promise<User> {
    return this.usersService.findUser(name);
  }

  @Mutation(returns => User)
  updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

  @Mutation(returns => User)
  async addProductToUserOrder(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('productId', { type: () => Int }) productId: number,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['orders'],
    });
    if (!user) {
      throw new Error('User not found');
    }

    const product = await this.productsService.findOne(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    return this.usersService.addProductToOrder(user, product);
  }
}
