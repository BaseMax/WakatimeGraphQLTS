import { Resolver, Mutation, Context, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegistrationUserInput } from './dto/register.input';
import { LoginUserInput } from './dto/login.input';
import { ResetPasswordInput } from './dto/reset-password.input';
import { AuthModel } from './auth.model';
import { HttpException } from '@nestjs/common';

@Resolver(() => AuthModel)
export class AuthResolver {
  constructor(private service: AuthService) {}

  @Mutation(() => AuthModel)
  async userRegister(
    @Context() ctx: any,
    @Args('input') input: RegistrationUserInput,
  ) {
    try {
      const { userCreated, token } = await this.service.register(input);
      ctx.req.user = userCreated;
      return { token, ...userCreated };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Mutation(() => AuthModel)
  async userLogin(@Context() ctx: any, @Args('input') input: LoginUserInput) {
    const { userFound, token } = await this.service.login(input);
    ctx.req.user = userFound;
    return { ...userFound, token };
  }

  @Mutation(() => AuthModel)
  async userLogOut(@Args('id') id: number) {
    const userFound = await this.service.userLogOut(id);
    return { ...userFound, token: '' };
  }

  @Mutation(() => AuthModel)
  async ResetPassword(
    @Context() ctx: any,
    @Args('input') input: ResetPasswordInput,
  ) {
    const { userRecovery, token } = await this.service.resetPassword(input);
    ctx.req.user = userRecovery;
    return { ...userRecovery, token };
  }
}
