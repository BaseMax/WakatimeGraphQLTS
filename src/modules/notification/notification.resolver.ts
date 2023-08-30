import { Injectable } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { NotificationPreferenceDTO } from './dto';
import { User } from '../user/user.model';
import { GqlUser } from '../user/user.decorator';

@Resolver(() => User)
export class NotificationResolver {
  constructor(private notifService: NotificationService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  async setNotificationPreferences(
    @Args('input') input: NotificationPreferenceDTO,
    @GqlUser() user: any,
  ) {
    return await this.notifService.setNotificationPreferences(input, user);
  }
}
