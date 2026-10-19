import { Injectable } from '@nestjs/common';
import {
  AlertRule,
  EventCategory,
  NotificationChannel,
} from './domain/alert.types.js';
import { CreateAlertDto } from './dto/create-alert.dto.js';

@Injectable()
export class AlertsRepository {
  constructor() {
    // 🚨 ATOMBIZTOS MEGOLDÁS: A globális Node.js környezetbe ágyazzuk a Store-t.
    // Így garantáltan egyetlen közös Map létezik az egész futó alkalmazásban!
    const globalStore = (globalThis as any).__sonrisaAlertRulesStore;

    if (!globalStore) {
      (globalThis as any).__sonrisaAlertRulesStore = new Map<
        string,
        AlertRule
      >();
      this.seedDefaultRules();
    }
  }

  // Segéd-getter, hogy kényelmesen elérjük a globális perzisztens tárolót
  private get store(): Map<string, AlertRule> {
    return (globalThis as any).__sonrisaAlertRulesStore;
  }

  async create(rule: CreateAlertDto): Promise<AlertRule> {
    const ruleName =
      rule.name && rule.name.trim() !== ''
        ? rule.name.trim()
        : `Unnamed Alert (${rule.category})`;

    const newRule: AlertRule = {
      id: crypto.randomUUID(),
      name: ruleName,
      category: rule.category,
      channels: rule.channels,
      isActive: true,
      createdAt: new Date(),
    };

    // Írás a globális, szétválaszthatatlan tárolóba
    this.store.set(newRule.id, newRule);
    return newRule;
  }

  async findAll(): Promise<AlertRule[]> {
    // Olvasás ugyanabból a globális tárolóból
    return Array.from(this.store.values());
  }

  async findByCategory(category: EventCategory): Promise<AlertRule[]> {
    const rules = await this.findAll();
    return rules.filter((rule) => rule.category === category && rule.isActive);
  }

  async delete(id: string): Promise<boolean> {
    return this.store.delete(id);
  }

  private seedDefaultRules(): void {
    const default1: AlertRule = {
      id: crypto.randomUUID(),
      name: 'Default Stock Alert',
      category: EventCategory.MARKET_MOVEMENT,
      channels: [NotificationChannel.EMAIL, NotificationChannel.SLACK],
      isActive: true,
      createdAt: new Date(),
    };

    const default2: AlertRule = {
      id: crypto.randomUUID(),
      name: 'Global Emergency Monitor',
      category: EventCategory.NATURAL_DISASTER,
      channels: [NotificationChannel.EMAIL],
      isActive: true,
      createdAt: new Date(),
    };

    // Legelső induláskor feltöltjük a globális tárolót
    (globalThis as any).__sonrisaAlertRulesStore.set(default1.id, default1);
    (globalThis as any).__sonrisaAlertRulesStore.set(default2.id, default2);
  }
}
