import { Resolver, Query, Mutation, Arg, Ctx, InputType, Field, ID, Int, UseMiddleware, FieldResolver, Root } from "type-graphql";
import { Recipe } from "../entity/Recipe";
import { Category } from "../entity/Category";
import { User } from "../entity/User";
import { isAuth } from "../middlewares/isAuth";
import { MyContext } from "../context";


@InputType()
class RecipeInput implements Partial<Recipe> {
    @Field(() => String)
    name!: string
    @Field(() => String)
    description!: string
    @Field(type => String)
    ingredients!: string
    @Field(type => ID)
    categoryId!: number
}

@InputType()
class RecipeUpdateInput implements Partial<Recipe> {
    @Field(() => String, {nullable: true})
    name?: string
    @Field(()=> String, {nullable: true})
    description?: string
    @Field(() => String, {nullable: true})
    ingredients?: string
    @Field(type => ID, { nullable: true })
    categoryId?: number
}


@Resolver(of  => Recipe)
export class RecipeResolver {
    @Query(() => [Recipe])
    @UseMiddleware(isAuth)
    getRecipes(){
        return Recipe.find();
    }

    @Query(() => Recipe)
    @UseMiddleware(isAuth)
    getOneRecipe(@Arg("id", ()=> Int)id: number){
        return Recipe.findOne(id);
    }
    @Query(() => [Recipe] )
    @UseMiddleware(isAuth)
    async getMyRecipes(@Ctx() { payload }: MyContext){
     const user = payload!.userId;
     const myRecipes = await Recipe.find({where: {authorId: user}})
     return myRecipes;     
    }
    
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async createRecipe(
        @Arg("variables", () => RecipeInput) variables: RecipeInput,
        @Ctx() { payload }: MyContext,
    ) {
        const userID = payload!.userId;
         await Recipe.insert({
            ...variables,
            authorId: userID,
        });
        return true;
        
        
    }
    @Mutation(() => Boolean)
    async updateRecipe(
        @Arg("id", ()=> Int)id: number,
        @Arg("fields", ()=> RecipeUpdateInput)fields:RecipeUpdateInput,
    ){
        await Recipe.update({ id }, fields)
        return true;
    }
    @Mutation(() => Boolean)
    async deleteRecipe(@Arg("id", () => Int) id: number){
        await Recipe.delete(id);
        return true
    }
    
    @FieldResolver()
    async category(@Root() recipe:Recipe){
        return await Category.findOne(recipe.categoryId);
    }

    @FieldResolver()
    async author(@Root() recipe:Recipe){
        return await User.findOne(recipe.authorId);
    }

}