import { CommonModule } from '@angular/common';
import { Component, output, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  backspaceOutline,
  checkmarkOutline,
  closeOutline,
  gridOutline,
} from 'ionicons/icons';

addIcons({ backspaceOutline, checkmarkOutline, closeOutline, gridOutline });

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class KeyboardComponent {
  keys = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  value = signal(0);
  confirm = output<number>();

  onAdd(value: number) {
    const buffer = this.value().toString();
    if (buffer.length + 1 > 3) return;
    this.value.set(parseInt(buffer + value));
  }

  onBack() {
    const buffer = this.value().toString();
    const len = buffer.length;
    len === 1
      ? this.value.set(0)
      : this.value.set(parseInt(buffer.slice(len - 2, len - 1)));
  }

  onClear() {
    this.value.set(0);
  }

  onConfirm() {
    this.confirm.emit(this.value());
    this.onClear();
  }
}
