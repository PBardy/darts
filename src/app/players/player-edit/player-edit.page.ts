import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { PlayerService, PlayerStore } from '@store/player';

@Component({
  templateUrl: './player-edit.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class PlayerEditPage {
  fb = inject(FormBuilder);
  store = inject(Store);
  router = inject(Router);
  playerStore = inject(PlayerStore);
  playerService = inject(PlayerService);

  form = computed(() =>
    this.fb.group({
      name: this.fb.nonNullable.control(
        this.playerService.player()?.name ?? '',
        [Validators.required],
      ),
    }),
  );

  onSubmit() {
    const form = this.form();
    const id = this.playerService.pid();

    if (form.valid && id) {
      this.playerStore.updateOne(id, form.getRawValue());
      this.router.navigate(['players']);
    }
  }
}
