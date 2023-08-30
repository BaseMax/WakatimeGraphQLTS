import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { Editor } from '@prisma/client';
import { CreateEditroInput, UpdateEditroInput } from './dto';
@Injectable()
export class EditorService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  async createEditor(input: CreateEditroInput): Promise<Editor> {
    const { userId, ...data } = input;
    const userFound = await this.userService.findUserById(userId);
    const createdEditor = await this.prismaService.editor.create({
      data: {
        ...data,
        User: {
          connect: {
            id: input.userId,
          },
        },
      },
    });
    return createdEditor;
  }

  async getEditorData(editorId: number) {
    const foundEditor = await this.prismaService.editor.findUnique({
      where: {
        id: editorId,
      },
      include: {
        Projects: true,
      },
    });
    if (!foundEditor) {
      throw new BadRequestException('editor with this id did not found');
    }
    return foundEditor;
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

  async updateEditor(input: UpdateEditroInput) {
    const foundEditor = await this.prismaService.editor.findUnique({
      where: {
        id: Number(input.id),
      },
    });
    if (!foundEditor) {
      throw new BadRequestException('there is no editor with thid id provided');
    }
    const { projectID, id, ...data } = input;
    const updateEditor = await this.prismaService.editor.update({
      where: {
        id: Number(id),
      },
      data: {
        ...data,
        Projects: {
          connect: {
            id: Number(projectID),
          },
        },
      },
    });
    return updateEditor;
  }
}
