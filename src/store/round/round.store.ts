import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
} from '@ngrx/signals';
import {
  EntityId,
  addEntity,
  removeAllEntities,
  removeEntities,
  removeEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { nanoid } from 'nanoid';
import { Round, RoundStub } from './round.model';

const factory = (overrides: Partial<Round> = {}): Round => ({
  id: nanoid(),
  gid: nanoid(),
  set: 0,
  leg: 0,
  rnd: 0,
  prevRndId: null,
  scores: {},
  createdAt: new Date().toISOString(),
  ...overrides,
});

export const RoundStore = signalStore(
  { providedIn: 'root' },
  withEntities<Round>(),
  withComputed(() => ({})),
  withMethods((s) => ({
    addOne(stub: RoundStub) {
      const round = factory(stub);
      patchState(s, addEntity(round));
      return round;
    },
    removeOne(id: EntityId) {
      patchState(s, removeEntity(id));
    },
    removeMany(ids: EntityId[]) {
      patchState(s, removeEntities(ids));
    },
    removeAll() {
      patchState(s, removeAllEntities());
    },
  })),
);
