import { Module } from '@nestjs/common';
import { EditorService } from './editor.service';
import { EditorResolver } from './editor.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [EditorService, EditorResolver],
  exports: [EditorService],
  imports: [PrismaModule, UserModule],
})
export class EditorModule {}
