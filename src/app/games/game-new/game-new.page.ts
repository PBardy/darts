import { CommonModule, KeyValuePipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PressDirective } from '@directives/press/press.directive';
import {
  ActionSheetController,
  AlertController,
  IonicModule,
  NavController,
} from '@ionic/angular';
import { GameStore } from '@store/game';
import { Player, PlayerStore } from '@store/player';
import { RoundStore } from '@store/round';
import { RoundService } from '@store/round/round.service';
import { addIcons } from 'ionicons';
import { addOutline, trashOutline } from 'ionicons/icons';
import { chain, difference, size, values } from 'underscore';

addIcons({ addOutline, trashOutline });

@Component({
  templateUrl: './game-new.page.html',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    KeyValuePipe,
    PressDirective,
  ],
})
export class GameNewPage {
  fb = inject(FormBuilder);
  cdr = inject(ChangeDetectorRef);
  router = inject(Router);
  gameStore = inject(GameStore);
  roundStore = inject(RoundStore);
  roundService = inject(RoundService);
  playerStore = inject(PlayerStore);
  actionSheet = inject(ActionSheetController);
  navController = inject(NavController);
  alertController = inject(AlertController);

  form = this.fb.group({
    config: this.fb.nonNullable.group({
      sets: this.fb.nonNullable.control(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(21),
      ]),
      legs: this.fb.nonNullable.control(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(21),
      ]),
      target: this.fb.nonNullable.control(301, [
        Validators.required,
        Validators.min(2),
        Validators.max(999),
      ]),
    }),
    players: this.fb.nonNullable.group<Record<string, Player>>({}),
  });

  get config() {
    return this.form.controls.config;
  }

  get players() {
    return this.form.controls.players;
  }

  async onAddPlayers() {
    const sheet = await this.actionSheet.create({
      header: 'Add Player',
      buttons: chain(
        difference(this.playerStore.entities(), values(this.players.value)),
      )
        .map((data) => ({ text: data?.name, data }))
        .value(),
    });
    await sheet.present();
    const action = await sheet.onDidDismiss();
    const player = action.data;

    if (player) {
      this.players.addControl(player.id, this.fb.nonNullable.control(player));
      this.cdr.detectChanges();
    }
  }

  onEditPlayers() {
    this.router.navigate(['games', 'new', 'players']);
  }

  onRemovePlayers(player: Player) {
    this.players.removeControl(player.id as unknown as never);
    this.cdr.detectChanges();
  }

  async onSubmit() {
    if (size(this.players.value) < 2) {
      const alert = await this.alertController.create({
        header: 'Invalid',
        message: 'At least 2 players are required',
        buttons: ['OK'],
      });

      await alert.present();

      return;
    }

    if (this.form.valid) {
      const game = this.gameStore.addOne(this.form.getRawValue());
      this.roundService.createInitialRound(game);
      this.router.navigate(['games', game.id]);
    }
  }
}
