import { Injectable, computed, inject } from '@angular/core';
import { getRouterSelectors } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { RoundStore } from '@store/round';
import { chain, get, last, size, values } from 'underscore';
import { Game } from './game.models';
import { GameStore } from './game.store';

@Injectable({ providedIn: 'root' })
export class GameService {
  store = inject(Store);
  gameStore = inject(GameStore);
  roundStore = inject(RoundStore);

  gid = this.store.selectSignal(getRouterSelectors().selectRouteParam('gid'));

  game = computed(() => get(this.gameStore.entityMap(), this.gid() as string));

  rounds = computed(() =>
    chain(this.roundStore.entities())
      .filter((entity) => entity.gid === this.gid())
      .sortBy((entity) => entity.createdAt)
      .value(),
  );

  round = computed(() => last(this.rounds()));

  player = computed(() => {
    const game = this.game();
    const round = this.round();
    if (!game || !round) return undefined;
    const playersLen = size(game.players);
    const gameOffset = game.config.sets % playersLen;
    const setOffset = game.config.legs % playersLen;
    const offset = gameOffset + setOffset;
    const absIndex = round.rnd + offset;
    const index = absIndex % playersLen;
    const player = values(game.players).at(index);
    return player;
  });

  complete(game: Game) {
    const rounds = chain(this.roundStore.entities())
      .filter((round) => round.gid === game.id)
      .value();

    const roundIds = rounds.map((round) => round.id);

    this.gameStore.complete(game.id, rounds);
    this.roundStore.removeMany(roundIds);
  }
}
