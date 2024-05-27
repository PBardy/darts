import { EntityId } from '@ngrx/signals/entities';

export type Score = {
  sets: number;
  legs: number;
  total: number;
};

export type RoundStub = {
  gid: EntityId;
  set: number;
  leg: number;
  rnd: number;
  prevRndId: EntityId | null;
  scores: Record<string, Score>;
};

export type Round = RoundStub & {
  id: EntityId;
  createdAt: string;
};
