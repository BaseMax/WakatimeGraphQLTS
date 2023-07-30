import { ParseIntPipe } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { Editor } from './editor.model';
import { EditorService } from './editor.service';

@Resolver(() => Editor)
export class EditorResolver {
  constructor(private editorService: EditorService) {}

  @Query(() => Editor)
  async getEditorData(@Args('editorId', ParseIntPipe) editorId: number) {
    return await this.editorService.getEditorData(editorId);
  }

  @Query(() => Editor)
  async getEditorDataByDate(
    @Args('editorId', ParseIntPipe) editorId: number,
    @Args('date') date: string,
  ) {
    return await this.editorService.getEditorDataByDate(editorId, date);
  }
}
