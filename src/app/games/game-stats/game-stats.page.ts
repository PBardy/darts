import { CommonModule, KeyValuePipe } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GameService } from '@store/game';
import { chain, groupBy } from 'underscore';

@Component({
  templateUrl: './game-stats.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, KeyValuePipe],
})
export class GameStatsPage {
  gameService = inject(GameService);

  gameStats = computed(() => {
    const game = this.gameService.game()!;
    const rounds = game.history;
    const sets = chain(rounds)
      .groupBy((round) => round.set)
      .map((set) => groupBy(set, (round) => round.leg))
      .value();

    return sets;
  });

  constructor() {
    effect(() => console.log(this.gameStats()));
  }
}
