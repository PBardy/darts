import { patchState, signalStore, withMethods } from '@ngrx/signals';
import { addEntity, withEntities } from '@ngrx/signals/entities';
import { nanoid } from 'nanoid';
import { Game, GameStub } from './game.models';

const factory = (overrides: Partial<Game> = {}): Game => ({
  id: nanoid(),
  set: 0,
  leg: 0,
  rnd: 0,
  config: { sets: 1, legs: 1, target: 301 },
  players: {},
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});

export const GameStore = signalStore(
  { providedIn: 'root' },
  withEntities<Game>(),
  withMethods((s) => ({
    addOne(stub: GameStub) {
      const game = factory(stub);
      patchState(s, addEntity(game));
      return game;
    },
  })),
);
