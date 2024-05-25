import { Routes } from '@angular/router';
import { PlayerEditPage } from './player-edit/player-edit.page';
import { PlayerNewPage } from './player-new/player-new.page';
import { PlayersPage } from './players.page';

export const playerRoutes: Routes = [
  { path: '', component: PlayersPage },
  { path: 'new', component: PlayerNewPage },
  { path: ':pid', children: [{ path: 'edit', component: PlayerEditPage }] },
];
