import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-slate-50 text-slate-900">
      <!-- Globális Navigációs Sáv -->
      <nav class="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div class="container mx-auto px-6 py-4 flex items-center justify-between">
          <div
            class="flex items-center gap-2 font-black text-xl text-blue-600 tracking-tight cursor-pointer"
            routerLink="/"
          >
            🌐 SONRISA <span class="text-slate-400 font-normal">AlertSystem</span>
          </div>

          <div class="flex items-center gap-4">
            <a
              routerLink="/alerts"
              routerLinkActive="bg-blue-50 text-blue-600 border-blue-200"
              class="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 border border-transparent hover:bg-slate-50 transition"
            >
              🔔 User Workspace
            </a>
            <a
              routerLink="/admin"
              routerLinkActive="bg-purple-50 text-purple-600 border-purple-200"
              class="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 border border-transparent hover:bg-slate-50 transition"
            >
              👑 Admin Dashboard
            </a>
          </div>
        </div>
      </nav>

      <!-- Ide töltődnek be dinamikusan a komponensek az URL alapján -->
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class AppComponent {}
