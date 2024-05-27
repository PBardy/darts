import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KeyboardComponent } from '@components/keyboard/keyboard.component';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { ellipsisVerticalOutline } from 'ionicons/icons';

addIcons({ ellipsisVerticalOutline });

@Component({
  templateUrl: './game.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, KeyboardComponent],
})
export class GamePage {
  onCancel() {}

  onConfirm(score: number) {}
}
