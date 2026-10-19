import {
  IngestedEvent,
  NotificationChannel,
} from '../../alerts/domain/alert.types.js';

export interface NotificationResult {
  success: boolean;
  channel: NotificationChannel;
  error?: string;
  dispatchedAt: Date;
}

export interface NotificationProvider {
  // Megadja, hogy az adott provider melyik csatornáért felelős (Email, Slack, stb.)
  readonly channel: NotificationChannel;

  // Az értesítés tényleges kiküldése teljesen típusbiztos formában
  send(event: IngestedEvent): Promise<NotificationResult>;
}
