import { EventCategory, JsonObject } from '../domain/alert.types.js';

export class IngestEventDto {
  readonly title!: string;
  readonly message!: string;
  readonly category!: EventCategory;
  readonly metadata!: JsonObject; // A PROJ-201-ben bevezetett szigorú JSON típus
}
