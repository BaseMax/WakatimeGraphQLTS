import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateProjectInput {
  @IsString()
  @Field()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Field()
  @IsNotEmpty()
  userId: number;
}
