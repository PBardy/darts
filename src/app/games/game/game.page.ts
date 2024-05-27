import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { KeyboardComponent } from '@components/keyboard/keyboard.component';
import { ScoresComponent } from '@components/scores/scores.component';
import { AlertController, IonicModule } from '@ionic/angular';
import { GameService } from '@store/game';
import { RoundService } from '@store/round/round.service';
import { addIcons } from 'ionicons';
import { ellipsisVerticalOutline } from 'ionicons/icons';

addIcons({ ellipsisVerticalOutline });

@Component({
  templateUrl: './game.page.html',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ScoresComponent,
    KeyboardComponent,
  ],
})
export class GamePage {
  router = inject(Router);
  gameService = inject(GameService);
  roundService = inject(RoundService);
  alertController = inject(AlertController);

  onCancel() {}

  async onConfirm(score: number) {
    const game = this.gameService.game();
    const round = this.gameService.round();
    const player = this.gameService.player();

    if (game && round && player) {
      if (this.roundService.getScoreValidity(round, player, score)) {
        const x = this.roundService.createRound(game, round, player, score);
        if (x === null) {
          // Game won
          const alert = await this.alertController.create({
            header: `${player.name} wins`,
            buttons: ['CONTINUE'],
          });

          await alert.present();
          await alert.onDidDismiss();

          this.gameService.complete(game);
          this.router.navigate(['games', game.id, 'stats']);
        }

        return;
      }

      // Score is invalid, show warning to indicate this
      const alert = await this.alertController.create({
        header: 'Invalid',
        message: `The score ${score} is invalid`,
        buttons: ['OK'],
      });

      await alert.present();
    }
  }
}
