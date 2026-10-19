import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { NotificationEngine } from './interfaces/notification.engine.js';
import { NotificationProvider } from './interfaces/notification-provider.interface.js';

// Token a providerek DI-ben való azonosítására
export const NOTIFICATION_PROVIDERS_TOKEN = Symbol(
  'NOTIFICATION_PROVIDERS_TOKEN',
);

@Module({
  providers: [
    NotificationEngine,
    {
      // Itt injektáljuk be a tömböt, ami a konkrét Email és Slack osztályokat fogja tartalmazni
      // TODO #7
      provide: NOTIFICATION_PROVIDERS_TOKEN,
      useValue: [], // Ideiglenesen üres, amíg a konkrét stratégiák el nem készülnek
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
