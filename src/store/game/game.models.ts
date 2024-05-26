import { EntityId } from '@ngrx/signals/entities';
import { Player } from '@store/player/player.models';

export type GameConfig = {
  sets: number;
  legs: number;
  target: number;
};

export type GameStub = {
  config: GameConfig;
  players: Record<EntityId, Player>;
};

export type Game = GameStub & {
  id: EntityId;
  set: number;
  leg: number;
  rnd: number;
  createdAt: string;
  updatedAt: string;
};

export type GameState = {};
