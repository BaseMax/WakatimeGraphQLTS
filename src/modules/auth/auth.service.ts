import { Injectable, BadRequestException } from '@nestjs/common';
// import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { RegistrationUserInput } from './dto/register.input';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto/login.input';
import { ResetPasswordInput } from './dto/reset-password.input';
import { UserService } from '../user/user.service';
import { generateUniqueRandomString } from '../../utils/random-string.util';
import User from '@prisma/client';
import { ForgotPasswordInput } from './dto/forgot_password.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async signUp(userRegInput: RegistrationUserInput) {
    const userFoundWithUsername = await this.userService.findUserByUserName(
      userRegInput.username,
    );
    if (userFoundWithUsername) {
      throw new BadRequestException('user already exists with this username');
    }
    const userFoundWithEmail = await this.userService.findUserByEmail(
      userRegInput.email,
    );
    if (userFoundWithEmail) {
      throw new BadRequestException('user already exists with this email');
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(userRegInput.password, salt);
    const AtUser = '@' + userRegInput.username.replace(/ /g, '-');
    const userCreated = await this.prismaService.user.create({
      data: {
        ...userRegInput,
        password: hashedPassword,
        userAtId: AtUser,
      },
    });
    const token = await this.assignToken(userCreated);
    delete userCreated.password;
    return { userCreated, token };
  }

  async login(userLoginInput: LoginUserInput) {
    const userFoundWithUserName = await this.userService.findUserByUserName(
      userLoginInput.username,
    );
    if (!userFoundWithUserName) {
      throw new BadRequestException(
        'there is no user with this username please change and try again',
      );
    }
    const userFound = await this.userService.findUserByEmail(
      userLoginInput.email,
    );
    if (!userFound) {
      throw new BadRequestException(
        'there is no user with this email please change and try again',
      );
    }
    const checked = await this.checkPassword(
      userLoginInput.password,
      userFound.password,
    );
    if (!checked) {
      throw new BadRequestException('password incorrect');
    }
    const token = await this.assignToken(userFound);
    delete userFound.password;
    return { userFound, token };
  }

  async userLogOut(id: number) {
    const userFound = await this.userService.findUserById(id);
    delete userFound.password;
    return userFound;
  }

  async resetPassword(userResetInput: ResetPasswordInput) {
    if (userResetInput.newPassword !== userResetInput.passwordConfirm) {
      throw new BadRequestException('password do not match');
    }
    const userFound = await this.userService.findUserByUserName(
      userResetInput.username,
    );

    if (!userFound) {
      throw new BadRequestException('user with this username did not found');
    }

    const checked = await this.checkPassword(
      userResetInput.oldPassword,
      userFound.password,
    );

    if (!checked) {
      throw new BadRequestException('provided old password is not valid !');
    }
    const hashedNewPassword = await this.hashingPassword(
      userResetInput.newPassword,
    );

    const userRecovery = await this.prismaService.user.update({
      where: {
        username: userFound.username,
      },
      data: {
        ...userFound,
        password: hashedNewPassword,
      },
    });

    const token = await this.assignToken(userRecovery);
    delete userRecovery.password;
    return { userRecovery, token };
  }

  async forgotPassword(input: ForgotPasswordInput){
    
  }

  async hashingPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async assignToken(user: any): Promise<String> {
    const token = this.jwtService.sign({
      id: user.id,
      username: user.username,
    });
    return token;
  }

  async checkPassword(
    passwordPassed: string,
    userFoundPassword: string,
  ): Promise<Boolean | undefined> {
    const checked = await bcrypt.compare(passwordPassed, userFoundPassword);
    return checked;
  }

  async validateUserById(userId: number): Promise<any> {
    return this.prismaService.user.findUnique({ where: { id: userId } });
  }
}
