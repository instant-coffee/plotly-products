import { Field, ObjectType, Int, Float } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Field(type => Float)
  price: number;

  @ManyToOne(() => User, user => user.orders)
  @Field(type => User)
  user: User;
}
