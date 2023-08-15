import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Goal } from '@prisma/client';
import { CreateGoalDto, UpdateGoalDto } from './dto';
import { UserService } from '../user/user.service';

@Injectable()
export class GoalService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  async getGoals(): Promise<Goal[]> {
    const goals = await this.prismaService.goal.findMany();
    return goals;
  }

  async getGoal(goalID: number): Promise<Goal> {
    const goal = await this.prismaService.goal.findUnique({
      where: {
        id: goalID,
      },
    });
    if (!goal) {
      throw new BadRequestException('there is no goal with this ID');
    }
    return goal;
  }

  async createGoal(input: CreateGoalDto, user: any): Promise<Goal> {
    const foundUser = await this.userService.findUserById(user.id);
    const createdGoal = await this.prismaService.goal.create({
      data: {
        ...input,
        user: {
          connect: {
            id: foundUser.id,
          },
        },
      },
    });
    return createdGoal;
  }

  async updateGoal(input: UpdateGoalDto): Promise<Goal> {
    const foundGoal = await this.findGoalById(input.id);
    const { id, ...restInput } = input;
    const updatedGoal = await this.prismaService.goal.update({
      where: {
        id: input.id,
      },
      data: {
        ...restInput,
      },
    });
    return updatedGoal;
  }

  async findGoalById(goalID: number): Promise<Goal> {
    const foundGoal = await this.prismaService.goal.findUnique({
      where: {
        id: goalID,
      },
    });
    if (!foundGoal) {
      throw new BadRequestException('goal did not found with provided id');
    }
    return foundGoal;
  }

  async deleteGoal(goalID: number): Promise<Goal> {
    const deletedGoal = await this.prismaService.goal.delete({
      where: {
        id: goalID,
      },
    });
    return deletedGoal;
  }
}
