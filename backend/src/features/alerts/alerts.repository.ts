import { Injectable } from '@nestjs/common';
import {
  AlertRule,
  EventCategory,
  NotificationChannel,
} from './domain/alert.types.js';

@Injectable()
export class AlertsRepository {
  // In-memory adattároló
  private readonly alertRules: Map<string, AlertRule> = new Map();

  constructor() {
    // Seedelünk néhány alapértelmezett adatot a könnyebb tesztelhetőség kedvéért
    this.seedDefaultRules();
  }

  async create(rule: Omit<AlertRule, 'id' | 'createdAt'>): Promise<AlertRule> {
    const newRule: AlertRule = {
      ...rule,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    this.alertRules.set(newRule.id, newRule);
    return newRule;
  }

  async findAll(): Promise<AlertRule[]> {
    return Array.from(this.alertRules.values());
  }

  async findByCategory(category: EventCategory): Promise<AlertRule[]> {
    return this.findAll().then((rules) =>
      rules.filter((rule) => rule.category === category && rule.isActive),
    );
  }

  async delete(id: string): Promise<boolean> {
    return this.alertRules.delete(id);
  }

  private seedDefaultRules(): void {
    this.create({
      name: 'Default Stock Alert',
      category: EventCategory.MARKET_MOVEMENT,
      channels: [NotificationChannel.EMAIL, NotificationChannel.SLACK],
      isActive: true,
    });
    this.create({
      name: 'Global Emergency Monitor',
      category: EventCategory.NATURAL_DISASTER,
      channels: [NotificationChannel.EMAIL],
      isActive: true,
    });
  }
}
