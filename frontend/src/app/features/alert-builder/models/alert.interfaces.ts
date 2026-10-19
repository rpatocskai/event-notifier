export enum EventCategory {
  BREAKING_NEWS = 'BREAKING_NEWS',
  MARKET_MOVEMENT = 'MARKET_MOVEMENT',
  NATURAL_DISASTER = 'NATURAL_DISASTER',
}

export enum NotificationChannel {
  EMAIL = 'EMAIL',
  SLACK = 'SLACK',
}

export interface AlertRule {
  id: string;
  name: string;
  category: EventCategory;
  channels: NotificationChannel[];
  isActive: boolean;
  createdAt: string; // JSON-ből jövő ISO string
}

export interface CreateAlertDto {
  name: string;
  category: EventCategory;
  channels: NotificationChannel[];
}
