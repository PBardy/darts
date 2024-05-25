import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  templateUrl: './game-stats.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class GameStatsPage {}