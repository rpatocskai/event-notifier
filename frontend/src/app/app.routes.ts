import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'alerts',
    pathMatch: 'full',
  },
  {
    path: 'alerts',
    // Lusta betöltéssel behúzzuk az alert-builder modul saját útvonalait
    loadChildren: () =>
      import('./features/alert-builder/alert-builder.routes').then((m) => m.ALERT_BUILDER_ROUTES),
  },
  //{
  //   path: 'admin',
  // Ide fogjuk bekötni az M3-as mérföldkő Admin felületét (Előkészítés)
  //   loadChildren: () => import('./features/admin-panel/admin-panel.routes').then(m => m.ADMIN_PANEL_ROUTES)
  //  },
  {
    path: '**',
    redirectTo: 'alerts',
  },
];
