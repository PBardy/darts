import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { GameStore } from '@store/game';

@Component({
  templateUrl: './games.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class GamesPage {
  gameStore = inject(GameStore);
  navController = inject(NavController);
}
