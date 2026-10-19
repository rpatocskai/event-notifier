import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { NotificationEngine } from './interfaces/notification.engine.js';
import { NotificationProvider } from './interfaces/notification-provider.interface.js';
import { EmailNotificationProvider } from './strategies/email.strategy.js';
import { SlackNotificationProvider } from './strategies/slack.strategy.js';

// Token a providerek DI-ben való azonosítására
export const NOTIFICATION_PROVIDERS_TOKEN = Symbol(
  'NOTIFICATION_PROVIDERS_TOKEN',
);

@Module({
  providers: [
    NotificationEngine,
    EmailNotificationProvider,
    SlackNotificationProvider,
    {
      provide: NOTIFICATION_PROVIDERS_TOKEN,
      // A NestJS-nek megmondjuk, hogy gyűjtse össze a két külön osztályná példányosított providert egy tömbbe
      useFactory: (
        email: EmailNotificationProvider,
        slack: SlackNotificationProvider,
      ): NotificationProvider[] => {
        return [email, slack];
      },
      inject: [EmailNotificationProvider, SlackNotificationProvider],
    },
  ],
  exports: [NotificationEngine],
})
export class NotificationsModule implements OnModuleInit {
  constructor(
    private readonly engine: NotificationEngine,
    @Inject(NOTIFICATION_PROVIDERS_TOKEN)
    private readonly providers: NotificationProvider[],
  ) {}

  onModuleInit(): void {
    // Inicializációkor átadjuk a megtalált providereket a motornak
    this.engine.registerProviders(this.providers);
  }
}
