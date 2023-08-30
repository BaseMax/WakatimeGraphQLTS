import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Project } from '@prisma/client';
import { CreateProjectInput } from './dto';
@Injectable()
export class ProjectService {
  constructor(private prismaService: PrismaService) {}

  async createProject(input: any) {}

  async getProjectDetails(projectID: number): Promise<Project> {
    const project: Project = await this.prismaService.project.findUnique({
      where: {
        id: projectID,
      },
    });
    if (!project) {
      throw new BadRequestException('there was no project with this id');
    }
    return project;
  }

  async getProjects(): Promise<Project[]> {
    const projects = await this.prismaService.project.findMany();
    return projects;
  }

  async createProejct(input: CreateProjectInput): Promise<Project> {
    const { userId, ...data } = input;
    const createProject = await this.prismaService.project.create({
      data: {
        ...data,
        User: {
          connect: { id: input.userId },
        },
      },
    });
    return createProject;
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

  async deleteProject(projectID: number): Promise<Project> {
    const projectFound = await this.getProjectByID(projectID);
    const deletedProject = await this.prismaService.project.delete({
      where: {
        id: projectID,
      },
    });
    return deletedProject;
  }

  async getProjectByID(projectID: number): Promise<Project> {
    const projectFound = await this.prismaService.project.findUnique({
      where: {
        id: projectID,
      },
    });
    if (!projectFound) {
      throw new BadRequestException('project was not found with this id');
    }
    return projectFound;
  }
}
