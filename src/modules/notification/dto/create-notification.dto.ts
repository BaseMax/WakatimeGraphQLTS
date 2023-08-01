import { Field, ID, InputType } from '@nestjs/graphql';
import { IsArray, ArrayMinSize, IsString } from 'class-validator';

@InputType()
export class NotificationPreferenceDTO {
  @Field(() => [String])
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  notificationsType: string[];

  @Field(() => [String])
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  notificationDisturbHours: string[];

  @Field(() => String)
  @IsString()
  notificationStatus : string
  @Field(() => ID)
  userId: number;
}
