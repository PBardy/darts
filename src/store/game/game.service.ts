import { Injectable, computed, inject } from '@angular/core';
import { getRouterSelectors } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { GameStore } from './game.store';

@Injectable({ providedIn: 'root' })
export class GameService {
  store = inject(Store);
  gameStore = inject(GameStore);

  gid = this.store.selectSignal(getRouterSelectors().selectRouteParam('gid'));

  game = computed(() => {
    const gid = this.gid();
    const map = this.gameStore.entityMap();

    return gid ? map[gid] : undefined;
  });
}
