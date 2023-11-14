import { Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Resolver(of => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(returns => [Product])
  products(): Promise<Product[]> {
    return this.productsService.findAll();
  }
}
