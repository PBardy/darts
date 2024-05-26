import { EntityId } from '@ngrx/signals/entities';

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
