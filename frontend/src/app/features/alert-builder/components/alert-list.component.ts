import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertRule } from '../models/alert.interfaces';

@Component({
  selector: 'app-alert-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-xl shadow-md border border-slate-100 p-6">
      <h3 class="text-xl font-bold text-slate-700 mb-4 border-b border-slate-100 pb-2">
        Your Active Alert Rules
      </h3>

      @if (alerts().length === 0) {
        <div
          class="flex flex-col items-center justify-center py-12 text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-200"
        >
          <span class="text-4xl mb-2">📭</span>
          <p class="text-sm font-medium">No alert rules configured yet.</p>
        </div>
      } @else {
        <div class="overflow-x-auto rounded-lg border border-slate-100">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100">
                <th class="p-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Rule Name
                </th>
                <th class="p-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Category
                </th>
                <th class="p-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Channels
                </th>
                <th class="p-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              @for (rule of alerts(); track rule.id) {
                <tr class="hover:bg-slate-50/50 transition-colors">
                  <td class="p-3 text-sm font-semibold text-slate-800">{{ rule.name }}</td>
                  <td class="p-3 text-sm">
                    <span
                      class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                    >
                      {{ rule.category.replace('_', ' ') }}
                    </span>
                  </td>
                  <td class="p-3 text-sm">
                    <div class="flex gap-1.5">
                      @for (ch of rule.channels; track ch) {
                        <span
                          class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-600 uppercase tracking-tight"
                        >
                          {{ ch }}
                        </span>
                      }
                    </div>
                  </td>
                  <td class="p-3 text-sm">
                    <span
                      class="inline-flex items-center gap-1.5 font-bold text-xs"
                      [ngClass]="rule.isActive ? 'text-emerald-600' : 'text-amber-500'"
                    >
                      <span
                        class="h-2 w-2 rounded-full"
                        [ngClass]="rule.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'"
                      ></span>
                      {{ rule.isActive ? 'Active' : 'Disabled' }}
                    </span>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  `,
})
export class AlertListComponent {
  // Modern Angular v17.1+ Signal Input API használata a merev @Input() helyett
  readonly alerts = input.required<AlertRule[]>();
}
