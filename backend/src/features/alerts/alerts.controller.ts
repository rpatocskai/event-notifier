import {
  Controller,
  Post,
  Body,
  Get,
  Logger,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AlertsRepository } from './alerts.repository.js';
import { CreateAlertDto } from './dto/create-alert.dto.js';
import { AlertRule } from './domain/alert.types.js';

@Controller('api')
export class AlertsController {
  private readonly logger = new Logger(AlertsController.name);
  private readonly alertsRepository = new AlertsRepository(); // Vagy constructor inject, globalThis-szel mindegy

  @Post('alerts')
  @HttpCode(HttpStatus.CREATED)
  async createRule(@Body() dto: CreateAlertDto): Promise<AlertRule> {
    this.logger.log(`API POST triggered for creating rule: ${dto.name}`);
    // A repository létrehozza és berakja a globalThis-be
    return await this.alertsRepository.create(dto);
  }

  @Get('alerts')
  async getAllRules(): Promise<AlertRule[]> {
    this.logger.log('API GET triggered for fetching all rules');
    // ✨ GARANTÁLTAN A TELJES LISTÁT ADJA VISSZA
    return await this.alertsRepository.findAll();
  }
}
