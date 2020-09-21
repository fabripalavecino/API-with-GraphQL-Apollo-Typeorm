import  { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

import { Recipe } from "./Recipe";

@ObjectType()
@Entity()
export class User extends BaseEntity{
    @Field(()=>Int)
    @PrimaryGeneratedColumn()
    id!: number;
    @Field(() => String)
    @Column()
    name!: string
    @Field(() => String)
    @Column()
    email!: string
    @Field(() => String)
    @Column()
    password!: string
    
}