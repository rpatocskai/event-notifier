import { Injectable, Logger } from '@nestjs/common';
import {
  NotificationChannel,
  IngestedEvent,
} from '../../alerts/domain/alert.types.js';
import {
  NotificationProvider,
  NotificationResult,
} from '../interfaces/notification-provider.interface.js';

@Injectable()
export class EmailNotificationProvider implements NotificationProvider {
  private readonly logger = new Logger(EmailNotificationProvider.name);
  readonly channel = NotificationChannel.EMAIL;

  async send(event: IngestedEvent): Promise<NotificationResult> {
    this.logger.log(
      `[SMTP Outbox] Preparing email dispatch for event: ${event.id}`,
    );

    // Hálózati késleltetés szimulálása (150ms)
    await new Promise((resolve) => setTimeout(resolve, 150));

    // Szimulált e-mail törzs összeállítása
    const emailBody = `
      === SYSTEM ALERT: EMAIL DELIVERY ===
      To: system-subscriber@sonrisa.hu
      Subject: [${event.category}] ${event.title}
      Message: ${event.message}
      Timestamp: ${event.timestamp.toISOString()}
      =====================================
    `;

    // Biztonságos kiíratás a konzolra
    this.logger.log(emailBody);

    return {
      success: true,
      channel: this.channel,
      dispatchedAt: new Date(),
    };
  }
}
