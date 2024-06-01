import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  templateUrl: './game-edit.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class GameEditPage {
  navController = inject(NavController);
}
