import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { Language, Editor , } from '../editor/editor.model';
import { Type } from 'class-transformer';

@ObjectType('project')
@InputType('ProjectInput')
export class Project {
  @Field(() => ID)
  id: number;

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsNumber()
  totalTime: number;

  @Field(() => [Language])
  @Type(() => Object)
  languages: Language[];

  @Field(() => [Editor])
  editors: Editor[];
}
