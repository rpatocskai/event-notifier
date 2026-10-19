import { EventCategory, NotificationChannel } from '../domain/alert.types.js';

export class CreateAlertDto {
  name!: string;
  category!: EventCategory;
  channels!: NotificationChannel[];
}
