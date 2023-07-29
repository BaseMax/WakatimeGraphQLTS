import { Module } from '@nestjs/common';
import { EditorService } from './editor.service';
import { EditorResolver } from './editor.resolver';

@Module({
  providers: [EditorService, EditorResolver]
})
export class EditorModule {}
