import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'games',
    loadChildren: () =>
      import('./games/games.routes').then((m) => m.gameRoutes),
  },
  {
    path: 'players',
    loadChildren: () =>
      import('./players/players.route').then((m) => m.playerRoutes),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.routes').then((m) => m.settingRoutes),
  },
  {
    path: 'statistics',
    loadChildren: () =>
      import('./statistics/statistics.routes').then((m) => m.statisticRoutes),
  },
];
