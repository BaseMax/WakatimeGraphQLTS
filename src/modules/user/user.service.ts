import { Injectable, BadRequestException } from '@nestjs/common';
import { Activity, Project, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UpdateProfileInput } from './dto/updateProfile.dto';
import { userInfo } from 'os';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getAPIKey(user: any): Promise<String> {
    const id = user.id;
    const userFound = await this.prismaService.user.findUnique({
      where: { id: id },
    });
    if (!userFound) {
      throw new BadRequestException('user did not found with this id provided');
    }
    return userFound.APIKEY;
  }

  async checkAPIKeyValidity(apiKey: string): Promise<User> {
    const userWithThisAPI = await this.prismaService.user.findUnique({
      where: {
        APIKEY: apiKey,
      },
    });
    if (!userWithThisAPI) {
      throw new BadRequestException('there is no such a api key in system');
    }
    return userWithThisAPI;
  }

  async createAPIKey(user: any): Promise<String> {
    const id = user.id;
    const userFounder = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
    const uuid = uuidv4();
    const userUpdate = await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        APIKEY: uuid,
      },
    });
    return uuid;
  }

  async deleteAPIKey(apiKEYId: string): Promise<User> {
    const userFoundWithId = await this.prismaService.user.findUnique({
      where: {
        APIKEY: apiKEYId,
      },
    });
    if (!userFoundWithId) {
      throw new BadRequestException('there is no user with this api key id');
    }
    const updatedUser = await this.prismaService.user.update({
      where: {
        APIKEY: apiKEYId,
      },
      data: {
        APIKEY: '',
      },
    });
    return userFoundWithId;
  }

  async getUserProfile(user: any): Promise<User> {
    const id = user.id;
    const userFounder = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!userFounder) {
      throw new BadRequestException('user did not found with this id');
    }
    return userFounder;
  }

  async getUserCodeActivity(
    startDate: Date,
    endDate: Date,
    user: any,
  ): Promise<Activity[]> {
    // return [User]
    const userFound = await this.findUserById(user.id);
    const activities: Activity[] = await this.prismaService.activity.findMany({
      where: {
        AND: [
          { startDate: { gte: startDate } },
          { endDate: { lte: endDate } },
          { userId: user.id },
        ],
      },
    });
    return activities;
  }

  async deleteAccount(password: string, user: any): Promise<User> {
    const id = user.id;
    const userFound = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!userFound) {
      throw new BadRequestException('user did not found with this id');
    }
    let checked = await this.checkPassword(password, userFound.password);
    if (!checked) {
      throw new BadRequestException('password provided was incorrect');
    }
    const userDeleted = await this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
    return userDeleted;
  }

  async updateProfile(input: UpdateProfileInput, user: any) {
    const userFound = await this.findUserById(user.id);
    const updatedUser = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...input,
      },
    });
    return updatedUser;
  }

  async trackCodingActivity(
    projectID: number,
    language: string,
    file: string,
    startTime: string,
    endTime: string,
    user: any,
  ) {
    const userFound = await this.prismaService.user.findFirst({
      where: {
        projects: {
          some: {
            id: projectID,
          },
        },
      },
    });
    
  }

  async findUserByUserName(username: string): Promise<User | undefined | null> {
    if (!username) {
      throw new BadRequestException('invalid username provided');
    }
    const userFound = await this.prismaService.user.findUnique({
      where: {
        username: username,
      },
    });
    return userFound;
  }

  async findUserById(id: number): Promise<User | undefined> {
    if (!id) {
      throw new BadRequestException('id is invalid');
    }
    const userFound = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
      include: {},
    });
    if (!userFound) {
      throw new BadRequestException('user with provided id did not found');
    }
    return userFound;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const userFound = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!userFound) {
      throw new BadRequestException('user did not found with email provided');
    }
    return userFound;
  }

  async checkPassword(
    password: string,
    userSavedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, userSavedPassword);
  }
}
