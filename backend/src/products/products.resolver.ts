import { Args, Mutation, Query, Resolver, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductInput } from './dto/create-product.input';

@Resolver(of => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(returns => [Product])
  products(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Query(returns => Product)
  getProduct(@Args('id', { type: () => Int }) id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Mutation(returns => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productsService.createProduct(createProductInput);
  }
}
