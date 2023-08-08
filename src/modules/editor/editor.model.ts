import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Project } from '../project/project.model';

@ObjectType('editor')
export class Editor {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => [Project])
  projects: Project[];
}
