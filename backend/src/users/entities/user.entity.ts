import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from 'src/products/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field((type) => Int)
  age: number;

  @Column()
  @Field()
  email: string;

  @OneToMany(() => Product, (product) => product.user)
  @Field((type) => [Product], { nullable: true })
  orders?: Product[];
}
