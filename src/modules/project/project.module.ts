import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.resolver';

@Module({
  providers: [ProjectService, Project]
})
export class ProjectModule {}
