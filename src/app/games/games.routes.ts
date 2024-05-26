import { Routes } from '@angular/router';
import { GameEditPage } from './game-edit/game-edit.page';
import { GameNewPage } from './game-new/game-new.page';
import { GameStatsPage } from './game-stats/game-stats.page';
import { GamePage } from './game/game.page';
import { GamesPage } from './games.page';

export const gameRoutes: Routes = [
  { path: '', pathMatch: 'full', component: GamesPage },
  { path: 'new', pathMatch: 'full', component: GameNewPage },
  {
    path: ':gid',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: GamePage,
      },
      {
        path: 'edit',
        pathMatch: 'full',
        component: GameEditPage,
      },
      {
        path: 'stats',
        pathMatch: 'full',
        component: GameStatsPage,
      },
    ],
  },
];
