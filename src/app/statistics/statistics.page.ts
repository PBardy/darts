import { CommonModule, JsonPipe, KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { GameService } from '@store/game';
import { addIcons } from 'ionicons';
import { barChartOutline, peopleOutline } from 'ionicons/icons';

addIcons({ barChartOutline, peopleOutline });

@Component({
  templateUrl: './statistics.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, KeyValuePipe, JsonPipe],
})
export class StatisticsPage {
  router = inject(Router);
  gameService = inject(GameService);
}
