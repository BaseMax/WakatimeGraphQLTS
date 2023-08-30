import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CreateTeamDto, UpdateTeamDto } from './dto';
import { Team } from '@prisma/client';
import { Prisma } from '@prisma/client';
@Injectable()
export class TeamService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  async getTeams(): Promise<Team[]> {
    const teams = await this.prismaService.team.findMany();
    return teams;
  }

  async getTeamById(teamID: number): Promise<Team> {
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

  async getUsersTeams(user: any): Promise<Team[]> {
    const userFound = await this.prismaService.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        teams: {
          include: {
            groups: true,
          },
        },
      },
    });
    return userFound.teams;
  }

  async createTeam(user: any, input: CreateTeamDto): Promise<Team> {
    const userFound = await this.userService.findUserById(user.id);
    if (!userFound) {
      throw new BadRequestException('user did not found with this id');
    }
    const createdTeam = await this.prismaService.team.create({
      data: {
        name: input.name,
        users: {
          connect: {
            id: userFound.id,
          },
        },
      },
    });
    return createdTeam;
  }

  async updateTeam(input: UpdateTeamDto): Promise<Team> {
    const team = await this.getTeamById(Number(input.id));
    if (!team) {
      throw new BadRequestException('there is no team with this id');
    }
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
    if (!team) {
      throw new BadRequestException('team with this id didnot found');
    }
    const user = await this.prismaService.user.findUnique({
      where: {
        id: memberID,
      },
    });
    if (!user) {
      throw new BadRequestException('user with this id didnot found');
    }
    const teamUpdated = await this.prismaService.team.update({
      where: {
        id: teamID,
      },
      data: {
        users: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return teamUpdated;
  }

  async addToGroup(groupID: number, memberID: number, groupStatus: string) {
    const group = await this.prismaService.group.findUnique({
      where: {
        id: groupID,
      },
    });
    if (!group) {
      throw new BadRequestException('group with this id havnt found');
    }
    const user = await this.prismaService.user.findUnique({
      where: {
        id: memberID,
      },
    });
    if (!user) {
      throw new BadRequestException('user with this id did not found');
    }
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
