import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType('project')
export class Project {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  totalTime: number;

  @Field(() => [Language])
  languages: Language[];

  @Field(() => [Editor])
  editors: Editor[];
}

export class Language {
  @IsString()
  name: string;
}

export class Editor {
  @IsString()
  editor: string;
}
