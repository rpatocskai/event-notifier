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
export class SlackNotificationProvider implements NotificationProvider {
  private readonly logger = new Logger(SlackNotificationProvider.name);
  readonly channel = NotificationChannel.SLACK;

  async send(event: IngestedEvent): Promise<NotificationResult> {
    this.logger.log(
      `[Webhook Pending] Preparing Slack payload for event: ${event.id}`,
    );

    // Hálózati késleltetés szimulálása (100ms)
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Formázott Slack block kitöltése (Szimulált Slack API payload)
    const slackPayload = {
      text: `🚨 *New Alert Triggered:* ${event.title}`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Category:* ${event.category}\n*Message:* ${event.message}`,
          },
        },
      ],
    };

    this.logger.log(
      `[Slack Channel Output]: ${JSON.stringify(slackPayload, null, 2)}`,
    );

    return {
      success: true,
      channel: this.channel,
      dispatchedAt: new Date(),
    };
  }
}
