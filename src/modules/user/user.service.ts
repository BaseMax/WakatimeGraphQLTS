import { Injectable, BadRequestException } from '@nestjs/common';
import { Activity, Project, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UpdateProfileInput } from './dto/updateProfile.dto';
import { resolve } from 'path';
import * as fs from 'fs';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getAPIKey(user: any): Promise<User> {
    const id = user.id;
    const userFound = await this.prismaService.user.findUnique({
      where: { id: id },
    });
    if (!userFound) {
      throw new BadRequestException('user did not found with this id provided');
    }
    return userFound;
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

  async createAPIKey(user: any): Promise<User> {
    const id = user.id;
    const userFounder = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!userFounder) {
      throw new BadRequestException('user with this id did not found');
    }
    const uuid = uuidv4();
    const userUpdate = await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        APIKEY: uuid,
      },
    });
    return userUpdate;
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
    startDate: string,
    endDate: string,
    user: any,
  ): Promise<Activity[]> {
    const userFound = await this.findUserById(user.id);
    const activities: Activity[] = await this.prismaService.activity.findMany({
      where: {
        AND: [
          { startDate: { gte: new Date(startDate) } },
          { endDate: { lte: new Date(endDate) } },
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

  async updateProfile(
    input: UpdateProfileInput,
    user: any,
  ): Promise<User | null> {
    const userFound = await this.findUserById(user.id);
    if (!userFound) {
      throw new BadRequestException('there is no user with this id');
    }
    delete input.id;
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
  ): Promise<Activity> {
    const projectFound = await this.prismaService.project.findUnique({
      where: {
        id: projectID,
      },
    });
    if (!projectFound) {
      throw new BadRequestException('project did not found');
    }
    const userFound = await this.prismaService.user.findFirst({
      where: {
        projects: {
          some: {
            id: projectID,
          },
        },
      },
    });
    if (!userFound) {
      throw new BadRequestException('user with this project id not founds');
    }
    const userID: number = user.id;
    const activityCreated = await this.prismaService.activity.create({
      data: {
        language: language,
        startDate: new Date(startTime),
        endDate: new Date(endTime),
        userId: userID,
        projectId: projectID,
        file: file,
      },
    });
    const updatedUser = await this.prismaService.user.update({
      where: {
        id: userID,
      },
      data: {
        activities: {
          connect: activityCreated,
        },
      },
    });
    return activityCreated;
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
    return userFound;
  }

  async findUserByApiKEY(apiKEY: string): Promise<User> {
    const userFound = await this.prismaService.user.findUnique({
      where: {
        APIKEY: apiKEY,
      },
    });
    if (!userFound) {
      throw new BadRequestException('user did not found with provided apikey');
    }
    return userFound;
  }

  async checkPassword(
    password: string,
    userSavedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, userSavedPassword);
  }

  async uploadUserProfile(
    stream: NodeJS.ReadableStream,
    filename: string,
  ): Promise<string> {
    const path = resolve(__dirname, '..', 'uploads', filename);
    return new Promise((resolve, reject) =>
      stream
        .pipe(fs.createWriteStream(path))
        .on('finish', () => resolve('File uploaded successfully'))
        .on('error', (error) => reject(error)),
    );
  }
}
