import {
  Controller,
  Post,
  Body,
  Get,
  Logger,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { NotificationResult } from '../notifications/interfaces/notification-provider.interface.js';
import { NotificationEngine } from '../notifications/interfaces/notification.engine.js';
import { AlertsRepository } from './alerts.repository.js';
import { IngestedEvent, AlertRule } from './domain/alert.types.js';
import { IngestEventDto } from './dto/ingest-event.dto.js';

@Controller('api')
export class AlertsController {
  private readonly logger = new Logger(AlertsController.name);

  constructor(
    private readonly alertsRepository: AlertsRepository,
    private readonly notificationEngine: NotificationEngine,
  ) {}

  /**
   * Külső események fogadása (Ingestion API)
   * Feltérképezi a szabályokat és triggereli az értesítéseket.
   */
  @Post('events/ingest')
  @HttpCode(HttpStatus.OK)
  async ingestEvent(@Body() dto: IngestEventDto): Promise<{
    triggeredRulesCount: number;
    dispatches: NotificationResult[];
  }> {
    this.logger.log(
      `Received incoming event for ingestion: [${dto.category}] ${dto.title}`,
    );

    // Konvertálás belső IngestedEvent formátumra
    const event: IngestedEvent = {
      id: crypto.randomUUID(),
      category: dto.category,
      title: dto.title,
      message: dto.message,
      metadata: dto.metadata,
      timestamp: new Date(),
    };

    // 1. Megkeressük az összes aktív szabályt, ami erre a kategóriára iratkozott fel
    const matchingRules: AlertRule[] =
      await this.alertsRepository.findByCategory(event.category);
    this.logger.log(
      `Found ${matchingRules.length} matching active alert rules for category ${event.category}`,
    );

    // 2. Minden találatra lefuttatjuk a Notification Engine-t
    const allDispatches: NotificationResult[] = [];
    for (const rule of matchingRules) {
      const results = await this.notificationEngine.processAlert(rule, event);
      allDispatches.push(...results);
    }

    return {
      triggeredRulesCount: matchingRules.length,
      dispatches: allDispatches,
    };
  }

  /**
   * Segéd-végpont az aktív szabályok listázásához (Frontend által lesz használva)
   */
  @Get('alerts')
  async getAllRules(): Promise<AlertRule[]> {
    return this.alertsRepository.findAll();
  }
}
