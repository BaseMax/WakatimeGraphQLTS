import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, IsOptional } from 'class-validator';

@InputType()
export class UpdateProfileInput {
  @IsNumber()
  @Field(() => ID)
  id: number;

  @IsString()
  @Field()
  @IsOptional()
  username: string;

  @IsString()
  @Field()
  @IsOptional()
  bio: string;
}
