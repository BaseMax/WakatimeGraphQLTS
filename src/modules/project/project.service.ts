import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Project } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(private prismaService: PrismaService) {}

  async getProjectDetails(projectID: number): Promise<Project> {
    const project: Project = await this.prismaService.project.findUnique({
      where: {
        id: projectID,
      },
    });
    return project;
  }

  async getProjects(): Promise<Project[]> {
    const projects = await this.prismaService.project.findMany();
    return projects;
  }

  async getUsersProjects(user: any): Promise<Project[]> {
    const id = user.id;
    const userFound = await this.prismaService.user.findUnique({
      where: { id: id },
      include: {
        projects: true,
      },
    });
    if (!userFound) {
      throw new BadRequestException('user did not found with this id provided');
    }
    return userFound.projects;
  }
}
