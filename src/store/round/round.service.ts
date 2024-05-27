import { Injectable, inject } from '@angular/core';
import { EntityId } from '@ngrx/signals/entities';
import { Game } from '@store/game';
import { Player } from '@store/player';
import { get, mapObject } from 'underscore';
import { checkOuts } from './checkouts';
import { Round, Score } from './round.model';
import { RoundStore } from './round.store';

@Injectable({ providedIn: 'root' })
export class RoundService {
  roundStore = inject(RoundStore);

  getRound(id: EntityId) {
    return get(this.roundStore.entityMap(), id as string);
  }

  getPriorRound(round: Round) {
    return get(this.roundStore.entityMap(), round.prevRndId as string);
  }

  getScoreValidity(current: Round, player: Player, score: number) {
    if (score < 0) return false;
    if (score > 180) return false;
    const scores = current.scores;
    const currScore = scores[player.id].total;
    if (currScore > score) return true;
    if (currScore < score) return false;

    // When remaining === score, ensure its reachable via a valid double
    return this.getScoreCheckouts(currScore).length > 0;
  }

  getScoreCheckouts(target: number) {
    return checkOuts.get(target) ?? [];
  }

  createInitialRound(game: Game) {
    const round = this.roundStore.addOne({
      gid: game.id,
      set: 0,
      leg: 0,
      rnd: 0,
      prevRndId: null,
      scores: mapObject(
        game.players,
        () => ({ sets: 0, legs: 0, total: game.config.target }) satisfies Score,
      ),
    });

    return round;
  }

  createSet(game: Game, round: Round, player: Player) {
    const scores = structuredClone(round.scores);
    const total = game.config.target;

    // otherwise create a new set
    scores[player.id].sets += 1;

    const set = this.roundStore.addOne({
      gid: game.id,
      set: round.set + 1,
      leg: 0,
      rnd: 0,
      prevRndId: round.id,
      scores: mapObject(
        scores,
        (score) => ({ ...score, legs: 0, total }) satisfies Score,
      ),
    });

    return set;
  }

  createLeg(game: Game, round: Round, player: Player) {
    const scores = structuredClone(round.scores);
    const total = game.config.target;
    scores[player.id].legs += 1;

    const leg = this.roundStore.addOne({
      gid: game.id,
      set: round.set,
      leg: round.leg + 1,
      rnd: 0,
      prevRndId: round.id,
      scores: mapObject(
        scores,
        (score) => ({ ...score, total }) satisfies Score,
      ),
    });

    return leg;
  }

  createRound(game: Game, current: Round, player: Player, score: number) {
    const scores = structuredClone(current.scores);
    const currScore = scores[player.id];
    const nextScore = currScore.total - score;
    scores[player.id].total = nextScore;

    const round = this.roundStore.addOne({
      gid: game.id,
      set: current.set,
      leg: current.leg,
      rnd: current.rnd + 1,
      prevRndId: current.id,
      scores,
    });

    if (nextScore === 0) {
      if (currScore.legs + 1 === game.config.legs) {
        if (currScore.sets + 1 === game.config.sets) {
          return null;
        }

        return this.createSet(game, round, player);
      }

      return this.createLeg(game, round, player);
    }

    return round;
  }
}
