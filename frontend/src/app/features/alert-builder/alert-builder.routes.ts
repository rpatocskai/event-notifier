import { Routes } from '@angular/router';

export const ALERT_BUILDER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/alert-workspace.component').then((m) => m.AlertWorkspaceComponent),
  },
];
