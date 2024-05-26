import { Routes } from '@angular/router';
import { OverallPage } from './overall/overall.page';
import { RankingsPage } from './rankings/rankings.page';
import { StatisticsPage } from './statistics.page';

export const statisticRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', component: StatisticsPage },
      { path: 'overall', pathMatch: 'full', component: OverallPage },
      { path: 'rankings', pathMatch: 'full', component: RankingsPage },
    ],
  },
];
