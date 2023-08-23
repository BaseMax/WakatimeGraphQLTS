// import { Field, ID, ObjectType } from '@nestjs/graphql';
// import { IsString, IsOptional } from 'class-validator';
// import 
// @ObjectType('dashboard')
// export class Dashboard {
//   @Field(() => ID)
//   id: number;

//   @Field()
//   @IsString()
//   name: string;

//   @Field((type) => Group)
//   @IsOptional()
//   group: Group;

//   @Field((type) => User)
//   @IsOptional()
//   user: User;


//   @Field(() => [Notification])
//   alerts: Notification[];

//   alerts          Notification[]
//   projects        Project[]
//   timeZone        String //could change in future
//   singleTimeZone  Boolean
//   timeout         Int
//   restrictViewing Boolean
//   anonymous       Boolean
//   emailReport     Boolean
//   members         User[]
//   Group           Group?         @relation(fields: [groupId], references: [id])
//   groupId         Int?
// }
