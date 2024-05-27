import { CommonModule, JsonPipe, KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GameService } from '@store/game';
import { RoundService } from '@store/round/round.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule, KeyValuePipe, JsonPipe],
})
export class ScoresComponent {
  gameService = inject(GameService);
  roundService = inject(RoundService);
}
