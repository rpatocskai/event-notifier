import { Component, OnInit, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertBuilderService } from '../services/alert-builder.service';
import { EventCategory, NotificationChannel, CreateAlertDto } from '../models/alert.interfaces';
import { AlertListComponent } from './alert-list.component'; // Importáljuk az új komponenst

@Component({
  selector: 'app-alert-workspace',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AlertListComponent], // Regisztráljuk az importok között
  template: `
    <div class="container mx-auto p-6 font-sans">
      <h2 class="text-3xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
        <span>🚨</span> Alert Management Workspace
      </h2>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- BAL OLDAL: Új szabály létrehozása Form -->
        <div class="lg:col-span-5 bg-white rounded-xl shadow-md border border-slate-100 p-6 h-fit">
          <h3 class="text-xl font-bold text-slate-700 mb-4 border-b border-slate-100 pb-2">
            Create New Alert Rule
          </h3>

          <form [formGroup]="alertForm" (ngSubmit)="onSubmit()" class="space-y-5">
            <div class="flex flex-col gap-1.5">
              <label for="name" class="text-sm font-semibold text-slate-600">Alert Name:</label>
              <input
                id="name"
                type="text"
                formControlName="name"
                placeholder="e.g., Apple Stock Drop"
                class="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              @if (alertForm.controls.name.invalid && alertForm.controls.name.touched) {
                <p class="text-xs text-rose-500 font-medium mt-0.5">
                  Name is required (min 3 characters).
                </p>
              }
            </div>

            <div class="flex flex-col gap-1.5">
              <label for="category" class="text-sm font-semibold text-slate-600"
                >Event Category:</label
              >
              <select
                id="category"
                formControlName="category"
                class="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                @for (cat of categories; track cat) {
                  <option [value]="cat">{{ cat.replace('_', ' ') }}</option>
                }
              </select>
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-semibold text-slate-600">Notification Channels:</label>
              <div class="flex gap-6 mt-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <label
                  class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    [checked]="isChannelSelected(channelsEnum.EMAIL)"
                    (change
                    toggleChannel)="toggleChannel(channelsEnum.EMAIL)"
                    class="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span>Email Channel</span>
                </label>
                <label
                  class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    [checked]="isChannelSelected(channelsEnum.SLACK)"
                    (change
                    toggleChannel)="toggleChannel(channelsEnum.SLACK)"
                    class="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span>Slack Channel</span>
                </label>
              </div>
              @if (channelError()) {
                <p class="text-xs text-rose-500 font-medium mt-0.5">
                  At least one notification channel must be selected.
                </p>
              }
            </div>

            <button
              type="submit"
              [disabled]="alertForm.invalid || channelError()"
              class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-2.5 px-4 rounded-lg shadow-sm hover:shadow transition-all duration-150"
            >
              Create Rule
            </button>
          </form>
        </div>

        <!-- JOBB OLDAL: Külön komponensbe szervezett lista meghívása a Signal értékével -->
        <div class="lg:col-span-7">
          <app-alert-list [alerts]="alertService.alerts()"></app-alert-list>
        </div>
      </div>
    </div>
  `,
})
export class AlertWorkspaceComponent implements OnInit {
  readonly alertService = inject(AlertBuilderService);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly categories = Object.values(EventCategory);
  readonly channelsEnum = NotificationChannel;

  readonly selectedChannels = signal<NotificationChannel[]>([NotificationChannel.EMAIL]);
  readonly channelError = signal<boolean>(false);

  readonly alertForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    category: [EventCategory.BREAKING_NEWS, [Validators.required]],
  });

  ngOnInit(): void {
    this.alertService.loadAlerts().subscribe();
  }

  isChannelSelected(channel: NotificationChannel): boolean {
    return this.selectedChannels().includes(channel);
  }

  toggleChannel(channel: NotificationChannel): void {
    this.selectedChannels.update((current) => {
      const updated = current.includes(channel)
        ? current.filter((c) => c !== channel)
        : [...current, channel];

      this.channelError.set(updated.length === 0);
      return updated;
    });
  }

  onSubmit(): void {
    if (this.alertForm.invalid || this.channelError()) {
      return;
    }

    const formValue = this.alertForm.getRawValue();
    const payload: CreateAlertDto = {
      name: formValue.name,
      category: formValue.category,
      channels: this.selectedChannels(),
    };

    this.alertService.createAlert(payload).subscribe({
      next: () => {
        this.alertForm.reset({
          name: '',
          category: EventCategory.BREAKING_NEWS,
        });
        this.selectedChannels.set([NotificationChannel.EMAIL]);
      },
    });
  }
}
