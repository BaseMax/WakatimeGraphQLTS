import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Project } from '../project/project.model';

@ObjectType('editor')
@InputType('EditorInput')
export class Editor {
  @Field(() => ID)
  id: number;

  @Field()
  @IsString()
  name: string;

  @Field(() => [Project])
  projects: Project[];
}

@ObjectType('language')
@InputType('LanguageInput')
export class Language {
  @Field(() => ID)
  id: number;

  @Field()
  @IsString()
  name: string;

  @Field(() => [Project])
  projects: Project[];
}

// export class EditorInterace {
//    @Field(() => ID)
//   id: number;

//   @Field()
//   @IsString()
//   name: string;

//   @Field(() => [Project])
//   projects: Project[];
// }
