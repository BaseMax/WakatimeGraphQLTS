import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Project } from './project.model';
import { ProjectService } from './project.service';
import { GqlUser } from '../user/user.decorator';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private projectService: ProjectService) {}

  @Query(() => [Project])
  async getProjects() {
    return await this.projectService.getProjects();
  }

  @Query(() => Project)
  async getProjectDetails(@Args('projectId', ParseIntPipe) projectId: number) {
    return await this.projectService.getProjectDetails(projectId);
  }

  @Query(() => [Project])
  async getUsersProjects(@GqlUser() user: any) {
    return await this.projectService.getUsersProjects(user);
  }

  @Mutation(() => Project)
  async deleteProject(@Args('projectID', ParseIntPipe) projectID: number) {
    return await this.projectService.deleteProject(projectID);
  }

  
}
