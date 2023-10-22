import { Controller, Delete, Get, Param, Req } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }

  @Get()
  async findAll(@Req() req) {
    const userId = req.user.sub
    return await this.notificationsService.findAll(userId)
  }

  @Get('find/:notificationId')
  async findOne(@Req() req, @Param('notificationId') notificationId: string) {
    const userId = req.user.sub
    return await this.notificationsService.findOne(userId, notificationId)
  }

  @Delete('delete/:notificationId')
  async delete(@Req() req, @Param('notificationId') notificationId: string) {
    const userId = req.user.sub
    return await this.notificationsService.delete(userId, notificationId)

  }
}
