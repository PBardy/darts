import { Injectable, computed, inject } from '@angular/core';
import { getRouterSelectors } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { PlayerStore } from './player.store';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  store = inject(Store);
  playerStore = inject(PlayerStore);

  pid = this.store.selectSignal(getRouterSelectors().selectRouteParam('pid'));

  player = computed(() => {
    const pid = this.pid();
    console.log(pid);
    const map = this.playerStore.entityMap();

    return pid ? map[pid] : undefined;
  });
}
