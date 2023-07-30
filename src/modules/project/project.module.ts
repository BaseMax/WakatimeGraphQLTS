import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [ProjectService, ProjectResolver],
  exports: [ProjectService],
  imports: [PrismaModule],
})
export class ProjectModule {}
