import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Game, GameService } from '@store/game';
import { Round } from '@store/round';
import { chain, groupBy, last } from 'underscore';

@Component({
  templateUrl: './game-stats.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class GameStatsPage {
  router = inject(Router);
  gameService = inject(GameService);

  gameStats = computed(() => {
    const game = this.gameService.game()!;
    const sets = chain(game.history)
      .groupBy((round) => round.set)
      .map((set) => groupBy(set, (round) => round.leg))
      .value();

    return sets;
  });

  getSetWinner(game: Game, set: Round[]) {
    const lastRound = last(set) as Round;
    const [pid] = Object.entries(lastRound.scores).find(
      ([, value]) => value.total === 0,
    )!;

    return game.players[pid];
  }

  getLegWinner(game: Game, leg: Round[]) {
    const lastRound = last(leg) as Round;
    const [pid] = Object.entries(lastRound.scores).find(
      ([, value]) => value.total === 0,
    )!;

    return game.players[pid];
  }

  onContinue() {
    this.router.navigate(['home']);
  }
}
