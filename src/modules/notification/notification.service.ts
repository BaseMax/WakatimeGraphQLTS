import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { NotificationPreferenceDTO } from './dto';
@Injectable()
export class NotificationService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  async setNotificationPreferences(
    input: NotificationPreferenceDTO,
    user: any,
  ): Promise<User> {
    const userFound = await this.userService.findUserById(user.id);
    let usersDisturbHours: string[] = [
      ...userFound.notificationDisturbHour,
      ...input.notificationDisturbHours,
    ];
    const uniqueArrayDisturbHour = usersDisturbHours.filter(
      (value, index, self) => self.indexOf(value) === index,
    );

    let usersNotifTypes: string[] = [
      ...userFound.notificationsType,
      ...input.notificationsType,
    ];

    const uniqueArrayNotifTypes = usersNotifTypes.filter(
      (value, index, self) => self.indexOf(value) === index,
    );

    const userUpdated = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        notificationStatus: input.notificationStatus,
        notificationDisturbHour: uniqueArrayDisturbHour,
        notificationsType: uniqueArrayNotifTypes,
      },
    });

    return userUpdated;
  }
}
