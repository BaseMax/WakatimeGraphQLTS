import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { LeaderBoard } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateLeaderBoardInput,
  UpdateLeaderBoardInput,
} from './dto/index.dto';

@Injectable()
export class LeaderboardsService {
  constructor(private prismaService: PrismaService) {}

  async getLeaderBoard(leaderBoardID: number): Promise<LeaderBoard> {
    const leaderBoardFound = await this.prismaService.leaderBoard.findUnique({
      where: {
        id: leaderBoardID,
      },
    });
    if (!leaderBoardFound) {
      throw new BadGatewayException(
        'no leader borad with provided id was found',
      );
    }
    return leaderBoardFound;
  }
  async createLeaderBoard(
    input: CreateLeaderBoardInput,
    user: any,
  ): Promise<LeaderBoard> {
    const leaderBoardCreated = await this.prismaService.leaderBoard.create({
      data: {
        ...input,
        users: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return leaderBoardCreated;
  }

  async udpateLeaderBoard(input: UpdateLeaderBoardInput): Promise<LeaderBoard> {
    const leaderBoardFound = await this.getLeaderBoardByID(Number(input.id));
    if (!leaderBoardFound) {
      throw new BadRequestException('leader board was not found');
    }
    const { id, ...data } = input;
    const updatedLeaderBoard = await this.prismaService.leaderBoard.update({
      where: {
        id: Number(input.id),
      },
      data: {
        ...data,
      },
    });
    return updatedLeaderBoard;
  }

  async joinLeaderBoard(
    user: any,
    leaderBoardID: number,
  ): Promise<LeaderBoard> {
    const userFound = await this.prismaService.user.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!userFound) {
      throw new BadGatewayException('there is no user with this id');
    }
    const leaderBoardFound = await this.getLeaderBoardByID(leaderBoardID);
    const updatedLeaderBoard = await this.prismaService.leaderBoard.update({
      where: {
        id: leaderBoardID,
      },
      data: {
        users: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return updatedLeaderBoard;
  }

  async getLeaderBoardByID(leaderBoardID: number) {
    const leaderBoard = await this.prismaService.leaderBoard.findUnique({
      where: {
        id: leaderBoardID,
      },
    });
    if (!leaderBoard) {
      throw new BadGatewayException(
        'there was no leader board with provided id',
      );
    }
    return leaderBoard;
  }
}
