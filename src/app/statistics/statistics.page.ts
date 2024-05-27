import { CommonModule, JsonPipe, KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GameService } from '@store/game';

@Component({
  templateUrl: './statistics.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, KeyValuePipe, JsonPipe],
})
export class StatisticsPage {
  gameService = inject(GameService);
}
