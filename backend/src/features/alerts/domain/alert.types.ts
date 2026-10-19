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
  createdAt: Date;
}

// Biztonságos, szigorúan típusos JSON értékek reprezentálása
export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;
export interface JsonObject {
  [key: string]: JsonValue;
}
export interface JsonArray extends Array<JsonValue> {}

export interface IngestedEvent {
  id: string;
  category: EventCategory;
  title: string;
  message: string;
  metadata: JsonObject; // Teljesen típusbiztos, de rugalmas JSON objektum
  timestamp: Date;
}
