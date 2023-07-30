import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EditorService {
  constructor(private prismaService: PrismaService) {}
  async getEditorData(editorId: number) {
    // a data set for editor
  }

  async getEditorDataByDate(editorId : number,  date : String){
    // get data set for editor by a date
  }
}
