import { patchState, signalStore, withMethods } from '@ngrx/signals';
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
import { Game, GameStub } from './game.models';

const factory = (overrides: Partial<Game> = {}): Game => ({
  id: nanoid(),
  config: { sets: 1, legs: 1, target: 301 },
  players: {},
  history: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  completedAt: undefined,
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
