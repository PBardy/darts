import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  addOutline,
  peopleOutline,
  refreshOutline,
  settingsOutline,
  statsChartOutline,
} from 'ionicons/icons';

addIcons({
  addOutline,
  refreshOutline,
  peopleOutline,
  settingsOutline,
  statsChartOutline,
});

@Component({
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [IonicModule, RouterLink],
})
export class HomePage {}
