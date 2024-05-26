import { computed } from '@angular/core';
import { faker } from '@faker-js/faker';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  EntityId,
  addEntity,
  removeAllEntities,
  removeEntities,
  removeEntity,
  setEntities,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { nanoid } from 'nanoid';
import { chain } from 'underscore';

export type PlayerStub = {
  name: string;
};

export type Player = PlayerStub & {
  id: string;
  createdAt: string;
};

export type PlayerState = {
  filter: string;
  selected: EntityId[];
};

const factory = (overrides: Partial<Player> = {}): Player => ({
  id: nanoid(),
  name: faker.person.fullName(),
  createdAt: new Date().toISOString(),
  ...overrides,
});

export const playerInitialState: PlayerState = {
  filter: '',
  selected: [],
};

export const PlayerStore = signalStore(
  { providedIn: 'root' },
  withState(playerInitialState),
  withEntities<Player>(),
  withComputed((store) => ({
    filtered: computed(() =>
      chain(store.entities())
        .filter((player) => player.name.toLowerCase().includes(store.filter()))
        .value(),
    ),
  })),
  withMethods((s) => ({
    addOne: (data: PlayerStub) => {
      patchState(s, addEntity(factory(data)));
    },
    setAll: (data: Player[]) => {
      patchState(s, setEntities(data));
    },
    updateOne: (id: string, changes: Partial<Player>) => {
      patchState(s, updateEntity({ id, changes }));
    },
    removeOne: (id: string) => {
      patchState(s, removeEntity(id));
    },
    removeAll: () => {
      patchState(s, removeAllEntities());
      patchState(s, { selected: [] });
    },
    removeSelection: () => {
      patchState(s, removeEntities(s.selected()));
      patchState(s, { selected: [] });
    },
    search: (filter: string) => {
      patchState(s, { filter });
    },
    toggle: (id: string) => {
      const selected = s.selected();
      const index = selected.indexOf(id);
      index > -1 ? selected.splice(index, 1) : selected.push(id);
      patchState(s, { selected });
    },
    toggleAll: (state: boolean) => {
      patchState(s, { selected: state ? s.ids() : [] });
    },
  })),
  withHooks({
    onInit: (s) => s.setAll(faker.helpers.multiple(factory, { count: 10 })),
  }),
);
