import { Module } from '@nestjs/common';
import { NotificationsModule } from '../notifications/notifications.module.js';
import { AlertsController } from './alerts.controller.js';
import { AlertsRepository } from './alerts.repository.js';

@Module({
  imports: [NotificationsModule], // Biztosítjuk a hozzáférést a NotificationEngine-hez
  controllers: [AlertsController],
  providers: [AlertsRepository],
  exports: [AlertsRepository],
})
export class AlertsModule {}
