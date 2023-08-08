import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Goal } from '@prisma/client';
import { CreateGoalDto, UpdateGoalDto } from './dto';

@Injectable()
export class GoalService {
  constructor(private prismaService: PrismaService) {}

  async getGoals(): Promise<Goal[]> {}

  async getGoal(goalID: number): Promise<Goal> {}

  async createGoal(input: CreateGoalDto): Promise<Goal> {}

  async updateGoal(input: UpdateGoalDto): Promise<Goal> {}

  async deleteGoal(goalID: number): Promise<Goal> {}
}
