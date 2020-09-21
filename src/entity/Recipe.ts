import  { Entity, Column, PrimaryGeneratedColumn, BaseEntity, JoinColumn, ManyToOne, RelationId } from "typeorm";
import { Field, ObjectType, ID } from "type-graphql";
import { RelationColumn } from "../helpers";
import { Category } from "./Category";
import { User } from "./User";


@Entity()
@ObjectType()
export class Recipe  extends BaseEntity{
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;
    @Field(() => String)
    @Column()
    name!: string
    @Field(() => String)
    @Column()
    description!: string
    @Field(() => String)
    @Column()
    ingredients!: string
    @Field(() => Category)
    @ManyToOne( type => Category)
    category!: Category;
    @RelationColumn()
    categoryId!: number;
    @Field(type => User)
    @ManyToOne(type => User)
    author!: User;
    @RelationColumn()
    authorId!: number;
}