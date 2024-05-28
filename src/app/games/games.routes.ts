import { Routes } from '@angular/router';
import { gameExists } from '@store/game';
import { PlayersPage } from '../players/players.page';
import { GameEditPage } from './game-edit/game-edit.page';
import { GameNewPage } from './game-new/game-new.page';
import { GameStatsPage } from './game-stats/game-stats.page';
import { GamePage } from './game/game.page';
import { GamesPage } from './games.page';

export const gameRoutes: Routes = [
  { path: '', pathMatch: 'full', component: GamesPage },
  {
    path: 'new',
    children: [
      { path: '', pathMatch: 'full', component: GameNewPage },
      { path: 'players', pathMatch: 'full', component: PlayersPage },
    ],
  },
  {
    path: ':gid',
    canActivate: [gameExists],
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
