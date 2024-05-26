import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PlayerStore } from '@store/player/player.store';

@Component({
  templateUrl: './player-new.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class PlayerNewPage {
  fb = inject(FormBuilder);
  router = inject(Router);
  playerStore = inject(PlayerStore);

  form = this.fb.nonNullable.group({
    name: this.fb.nonNullable.control('', [Validators.required]),
  });

  onSubmit() {
    this.playerStore.addOne(this.form.getRawValue());
    this.router.navigate(['players']);
  }
}
