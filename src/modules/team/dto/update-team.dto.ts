import { Field, InputType, ID } from '@nestjs/graphql';
import {
  IsOptional,
  IsString,
  IsNumberString,
  IsNumber,
} from 'class-validator';
import { Transform } from 'class-transformer';

@InputType()
export class UpdateTeamDto {
  @IsNumberString()
  @Transform(({ value }) =>
    typeof value === 'string' ? parseInt(value, 10) : value,
  )
  @Field(() => ID)
  id: number | string;

  @Field()
  @IsString()
  @IsOptional()
  name: string;

  @Field()
  @IsOptional()
  @IsNumber()
  user: number;
}
