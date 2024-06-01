import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  EntityId,
  addEntity,
  removeAllEntities,
  removeEntity,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { Round } from '@store/round';
import { nanoid } from 'nanoid';
import { chain, values } from 'underscore';
import { Game, GameState, GameStub } from './game.models';

const setTitle = (game: Game): Game => {
  game.title = values(game.players)
    .map((player) => player.name)
    .join(' vs ');

  return game;
};

const factory = (overrides: Partial<Game> = {}): Game => {
  const game = {
    id: nanoid(),
    title: '',
    config: { sets: 1, legs: 1, target: 301 },
    players: {},
    history: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: undefined,
    ...overrides,
  };

  setTitle(game);

  return game;
};

const gameInitialState: GameState = {
  filter: '',
  selected: [],
};

export const GameStore = signalStore(
  { providedIn: 'root' },
  withEntities<Game>(),
  withState(gameInitialState),
  withComputed((store) => ({
    filtered: computed(() =>
      chain(store.entities())
        .filter((game) => game.title.toLowerCase().includes(store.filter()))
        .value(),
    ),
  })),
  withMethods((s) => ({
    addOne(stub: GameStub) {
      const game = factory(stub);
      patchState(s, addEntity(game));
      return game;
    },
    removeOne(id: EntityId) {
      patchState(s, removeEntity(id));
    },
    removeAll() {
      patchState(s, removeAllEntities());
    },
    complete: (id: EntityId, history: Round[]) => {
      const completedAt = new Date().toISOString();
      patchState(s, updateEntity({ id, changes: { history, completedAt } }));
    },
  })),
);
