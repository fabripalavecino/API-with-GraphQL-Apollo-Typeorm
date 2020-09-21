import  { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from "typeorm";
import { Field, ObjectType, ID } from "type-graphql";
import { Recipe } from "./Recipe";


@Entity()
@ObjectType()
export class Category extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;
    @Field(() => String)
    @Column()
    name!: string;
    @OneToMany(type => Recipe , recipe => recipe.category) 
    recipes!: Recipe[];
}