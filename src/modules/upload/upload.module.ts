import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadResolver } from './upload.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [UploadService, UploadResolver],
  imports: [PrismaModule],
})
export class UploadModule {}
