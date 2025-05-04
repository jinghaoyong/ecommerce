import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  @Input() message: string = '';
  @Input() variant: 'success' | 'error' | 'warning' = 'success';
  @Input() duration: number = 3000;

  visible: boolean = false;
  private timeoutRef: any;

  show(message: string, variant: 'success' | 'error' | 'warning' = 'success', duration: number = 3000) {
    this.message = message;
    this.variant = variant;
    this.duration = duration;
    this.visible = true;

    clearTimeout(this.timeoutRef);
    this.timeoutRef = setTimeout(() => this.hide(), duration);
  }

  hide() {
    this.visible = false;
  }
}
