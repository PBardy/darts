import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
  input,
  output,
} from '@angular/core';
import { Gesture, createGesture } from '@ionic/core';

@Directive({
  selector: '[appPress]',
  standalone: true,
})
export class PressDirective implements OnDestroy, OnInit {
  delay = input(1000);
  longpress = output();
  shortpress = output();
  elementRef = inject(ElementRef);

  timerId!: any;
  gesture!: Gesture;
  invoked = false;

  ngOnInit(): void {
    this.gesture = createGesture({
      el: this.elementRef.nativeElement,
      gestureName: 'press',
      threshold: 0,
      canStart: () => true,
      onStart: () => {
        this.timerId = setTimeout(() => {
          this.invoked = true;
          this.longpress.emit();
        }, this.delay());
      },
      onEnd: () => {
        if (!this.invoked) {
          this.shortpress.emit();
        }

        this.invoked = false;
        clearTimeout(this.timerId);
      },
    });

    this.gesture.enable();
  }

  ngOnDestroy(): void {
    this.gesture.destroy();
  }
}
