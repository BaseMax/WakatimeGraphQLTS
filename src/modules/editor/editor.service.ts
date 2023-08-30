import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { Editor } from '@prisma/client';
@Injectable()
export class EditorService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}
  async getEditorData(editorId: number) {
    
  }

  async getEditorDataByDate(editorId: number, date: string) {
    // get data set for editor by a date
  }

  async setIntegrationSettings(
    editor: string,
    apiKEY: string,
  ): Promise<Editor> {
    const userFound = await this.userService.findUserByApiKEY(apiKEY);
    const createdEditor = await this.prismaService.editor.create({
      data: {
        name: editor,
        userId: userFound.id,
      },
    });
    return createdEditor;
  }
}
