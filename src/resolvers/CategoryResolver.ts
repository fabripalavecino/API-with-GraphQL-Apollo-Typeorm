import { Resolver, Query, Mutation, Arg, InputType, Field , Int, UseMiddleware } from "type-graphql";
import { Category } from "../entity/Category";
import { isAuth } from "../middlewares/isAuth";

@InputType()
class CategoryInput{
    @Field()
    name!: string
}
@InputType()
class CategoryUpdateInput{
    @Field(() => String, { nullable: true })
    name?: string
}


@Resolver()
export class CategoryResolver {
    @Query(()=>[Category])
    @UseMiddleware(isAuth)
    getCategories() {
        return Category.find();
    }
    @Query(()  => Category)
    @UseMiddleware(isAuth)
    getOneCategory(@Arg("id", () => Int)id: number){
        return Category.findOne(id);
    }

    @Mutation(() => Category)
    async createCategory(
        @Arg("variables", ()=> CategoryInput) variables: CategoryInput
    ){
        const newCategory = Category.create(variables);
        await newCategory.save();
        return newCategory; 
    }
    @Mutation(() => Boolean)
    async updateCategory(
        @Arg("id", () => Int)id: number,
        @Arg("fields", () => CategoryUpdateInput)fields:CategoryUpdateInput,
    ){
        await Category.update({ id }, fields) 
        return true;
    }
    @Mutation(() => Boolean)
    async deleteCategory(@Arg("id", () => Int) id: number){
        await Category.delete(id);
        return true
    } 
}