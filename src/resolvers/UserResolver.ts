import  bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken";
import { Resolver, Mutation, Arg, InputType, Field, ID, ObjectType } from "type-graphql";
import { User } from "../entity/User";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken!: string;
}

@InputType()
class UserInput {
    @Field()
    name!: string
    @Field()
    email!: string
    @Field()
    password!: string
}



Resolver()
export class UserResolver {

    @Mutation(() => User)
    async signUp(
        @Arg("variables", () => UserInput)variables: UserInput
    ) {
        const user = await User.findOne({ email: variables.email });
        if (user) {
            throw new Error("Email already in use");
          }
          const hashedPassword = bcrypt.hashSync(variables.password, 10);
          const newUser = User.create({ ...variables, password: hashedPassword });
          const result = await newUser.save();
          return result;
        
    }
    
    @Mutation(() => LoginResponse)
  async Login(@Arg("email") email: string, @Arg("password") password: string) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Could not find user");
    }

    const verify = await bcrypt.compare(password, user.password);

    if (!verify) {
      throw new Error("Bad password");
    }

    return {
      accessToken: jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "15h"
      })
    };
  }

    
}