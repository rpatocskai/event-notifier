import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertRule, CreateAlertDto } from '../models/alert.interfaces';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AlertBuilderService {
  // Megosztott backend URL környezeti változó hiányában
  private readonly apiUrl = 'http://localhost:3000/api';
  private readonly http = inject(HttpClient);

  // Reaktív állapotkezelés Signal segítségével - elkerülve a felesleges BehaviorSubject boilerplate-t
  private readonly _alerts: WritableSignal<AlertRule[]> = signal([]);

  // Publikusan csak olvasható Signal-ként tesszük elérhetővé a komponensek számára
  readonly alerts = this._alerts.asReadonly();

  /**
   * Szabályok frissítése a backendről és a Signal állapotának frissítése
   */
  loadAlerts(): Observable<AlertRule[]> {
    return this.http
      .get<AlertRule[]>(`${this.apiUrl}/alerts`)
      .pipe(tap((data: AlertRule[]) => this._alerts.set(data)));
  }

  /**
   * Új Alert szabály létrehozása
   */
  createAlert(dto: CreateAlertDto): Observable<AlertRule> {
    return this.http.post<AlertRule>(`${this.apiUrl}/alerts`, dto).pipe(
      tap((newRule: AlertRule) => {
        // Optimista vagy azonnali állapotfrissítés a Signal-ban
        this._alerts.update((currentAlerts) => [...currentAlerts, newRule]);
      }),
    );
  }
}
