import { Injectable, Logger } from '@nestjs/common';
import {
  NotificationChannel,
  AlertRule,
  IngestedEvent,
} from '../../alerts/domain/alert.types.js';
import {
  NotificationProvider,
  NotificationResult,
} from './notification-provider.interface.js';

@Injectable()
export class NotificationEngine {
  private readonly logger = new Logger(NotificationEngine.name);
  private readonly providers: Map<NotificationChannel, NotificationProvider> =
    new Map();

  // A NestJS dependency injection automatikusan be firtatja az összes olyan providert,
  // amit regisztrálunk a modulban.
  registerProviders(providers: NotificationProvider[]): void {
    providers.forEach((provider) => {
      this.providers.set(provider.channel, provider);
      this.logger.log(
        `Notification provider registered for channel: ${provider.channel}`,
      );
    });
  }

  /**
   * Feldolgoz egy eseményt a hozzá párosított szabályok alapján,
   * és párhuzamosan kiküldi a kért csatornákra.
   */
  async processAlert(
    rule: AlertRule,
    event: IngestedEvent,
  ): Promise<NotificationResult[]> {
    this.logger.log(
      `Processing alert rule "${rule.name}" for event: ${event.title}`,
    );

    const promises = rule.channels.map(
      async (channel): Promise<NotificationResult> => {
        const provider = this.providers.get(channel);

        if (!provider) {
          this.logger.error(`No provider registered for channel: ${channel}`);
          return {
            success: false,
            channel,
            error: `Provider for ${channel} is missing from the configuration.`,
            dispatchedAt: new Date(),
          };
        }

        try {
          return await provider.send(event);
        } catch (err: unknown) {
          const errorMessage =
            err instanceof Error ? err.message : 'Unknown error occurred';
          this.logger.error(
            `Failed to send notification via ${channel}: ${errorMessage}`,
          );
          return {
            success: false,
            channel,
            error: errorMessage,
            dispatchedAt: new Date(),
          };
        }
      },
    );

    return Promise.all(promises);
  }
}
