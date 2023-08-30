import { ParseIntPipe } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateEditroInput, UpdateEditroInput } from './dto';
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

  @Mutation(() => Editor)
  async createEditor(@Args('input') input: CreateEditroInput) {
    return await this.editorService.createEditor(input);
  }

  @Mutation(() => Editor)
  async updateEditor(@Args('input') input: UpdateEditroInput) {
    return await this.editorService.updateEditor(input);
  }
}
