import { Resolver, Mutation, Args } from '@nestjs/graphql';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import { FileUploadResponse } from './dto/file-upload-response.dto';
import * as fs from 'fs'; // Import the fs module

@Resolver()
export class UploadResolver {
  @Mutation(() => FileUploadResponse)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: any,
  ): Promise<FileUploadResponse> {
    try {
      const { createReadStream, filename, mimetype, encoding } = await file;

      const randomName = new Date().toISOString() + '-' + filename;
      const path = resolve(__dirname, '../../uploads', randomName);

      const stream = createReadStream();
      const writeStream = createWriteStream(path);

      await new Promise((resolve, reject) => {
        stream
          .pipe(writeStream)
          .on('finish', resolve)
          .on('error', (error) => {
            writeStream.close();
            fs.unlinkSync(path);
            reject(error);
          });
      });

      return {
        success: true,
        message: 'File uploaded successfully',
        url: `http://localhost:3000/uploads/${randomName}`,
      };
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while uploading the file',
        url: null,
      };
    }
  }
}
