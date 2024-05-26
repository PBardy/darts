import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PressDirective } from '@directives/press/press.directive';
import { IonicModule } from '@ionic/angular';
import { Player, PlayerStore } from '@store/player';
import { addIcons } from 'ionicons';
import {
  addOutline,
  chevronUpCircleOutline,
  closeOutline,
  trashOutline,
} from 'ionicons/icons';

addIcons({ chevronUpCircleOutline, addOutline, closeOutline, trashOutline });

@Component({
  templateUrl: './players.page.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, CommonModule, FormsModule, PressDirective],
})
export class PlayersPage {
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);
  playerStore = inject(PlayerStore);

  onShortPress(player: Player, event: MouseEvent | null) {
    this.playerStore.selected().length > 0
      ? this.onLongPress(player, event)
      : this.router.navigate(['players', player.id, 'edit']);
  }

  onLongPress(player: Player, event: MouseEvent | null) {
    event?.preventDefault();
    event?.stopImmediatePropagation();
    this.playerStore.toggle(player.id);
    this.cdr.detectChanges();
  }

  onToggleAll(state: boolean) {
    this.playerStore.toggleAll(state);
    this.cdr.detectChanges();
  }

  onRemoveAll() {
    this.playerStore.removeAll();
    this.cdr.detectChanges();
  }

  onRemoveSelection() {
    this.playerStore.removeSelection();
    this.cdr.detectChanges();
  }

  onCancelSelection() {
    this.playerStore.toggleAll(false);
    this.cdr.detectChanges();
  }
}
