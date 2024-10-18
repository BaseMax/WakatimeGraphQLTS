import { Injectable, BadRequestException } from '@nestjs/common';
import { Project, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {

  constructor(private prismaService: PrismaService) { }

  async getAPIKey(user: any): Promise<String> {

    const id = user.id;

    const userFound = await this.prismaService.user.findUnique({ where: { id: id } });

    if (!userFound) throw new BadRequestException('user did not found with this id provided');

    return userFound.APIKEY;

  }

  async getProjects(user: any): Promise<Project[]> {

    const id = user.id;

    const userFound = await this.prismaService.user.findUnique({
      where: { id: id },
      include: { projects: true },
    });

    if (!userFound) throw new BadRequestException('user did not found with this id provided');

    return userFound.projects;

  }

  async checkAPIKeyValidity(apiKey: string): Promise<User> {

    const userWithThisAPI = await this.prismaService.user.findUnique({
      where: { APIKEY: apiKey },
    });

    if (!userWithThisAPI) throw new BadRequestException('there is no such a api key in system');

    return userWithThisAPI;

  }

  async createAPIKey(user: any): Promise<String> {

    const id = user.id;

    const userFounder = await this.prismaService.user.findUnique({
      where: { id: id },
    });

    const uuid = uuidv4();

    const userUpdate = await this.prismaService.user.update({
      where: { id: id },
      data: { APIKEY: uuid },
    });

    return uuid;

  }

  async deleteAccount(password: string, user: any): Promise<User> {

    const id = user.id;

    const userFound = await this.prismaService.user.findUnique({
      where: { id: id },
    });

    if (!userFound) throw new BadRequestException('user did not found with this id');

    let checked = await this.checkPassword(password, userFound.password);

    if (!checked) throw new BadRequestException('password provided was incorrect');

    const userDeleted = await this.prismaService.user.delete({
      where: { id: id }
    });

    return userDeleted;

  }

  async findUserByUserName(username: string): Promise<User | undefined | null> {

    if (!username) throw new BadRequestException('invalid username provided');

    const userFound = await this.prismaService.user.findUnique({
      where: { username: username },
    });

    return userFound;

  }

  async findUserById(id: number): Promise<User | undefined> {

    if (!id) throw new BadRequestException('id is invalid');

    const userFound = await this.prismaService.user.findUnique({
      where: { id: id },
      include: {},
    });

    if (!userFound) throw new BadRequestException('user with provided id did not found');

    return userFound;

  }

  async checkPassword(password: string, userSavedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, userSavedPassword);
  }
  
}
