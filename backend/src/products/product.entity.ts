import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  price: number;
}
