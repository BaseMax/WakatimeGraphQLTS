import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('editor')
export class Editor {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;
}