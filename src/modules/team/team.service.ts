import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CreateTeamDto, UpdateTeamDto } from './dto';
import { Group, Team } from '@prisma/client';

@Injectable()
export class TeamService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  async getTeams() {
    const teams = await this.prismaService.team.findMany();
    return teams;
  }

  async getTeamById(teamID: number) {
    const team = await this.prismaService.team.findUnique({
      where: {
        id: teamID,
      },
    });
    if (!team) {
      throw new BadRequestException('there is no team with this id');
    }
    return team;
  }

  async getUsersTeams(user: any) {
    const userFound = await this.userService.findUserById(user.id);
    return userFound.teams;
  }

  async createTeam(input: CreateTeamDto, user: any) {
    const createdTeam = await this.prismaService.team.create({
      data: {
        ...input,
      },
    });
    return createdTeam;
  }

  async updateTeam(input: UpdateTeamDto): Promise<Team> {
    const team = await this.getTeamById(input.id);
    const updatedTeam = await this.prismaService.team.update({
      where: { id: team.id },
      data: {
        name: input.name,
      },
    });
    return updatedTeam;
  }

  async addTeamMember(teamID: number, memberID: number): Promise<Team> {
    const team = await this.getTeamById(teamID);
    const user = await this.userService.findUserById(memberID);
    const teamUpdated = await this.prismaService.team.update({
      where: {
        id: teamID,
      },
      data: {
        users: {
          connect: user,
        },
      },
    });
    return teamUpdated;
  }

  async addToGroup(
    groupID: number,
    memberID: number,
    groupStatus: string,
  ): Promise<Group> {
    const group = await this.prismaService.group.findUnique({
      where: {
        id: groupID,
      },
    });
    const user = await this.prismaService.user.findUnique({
      where: {
        id: memberID,
      },
    });
    const groupUpdated = await this.prismaService.group.update({
      where: {
        id: groupID,
      },
      data: {
        [groupStatus]: {
          connect: user,
        },
      },
    });
    return groupUpdated;
  }
}
