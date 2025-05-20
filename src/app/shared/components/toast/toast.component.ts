import { Component, Input } from '@angular/core';
import { ToastData, ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  message: string = '';
  variant: 'success' | 'error' | 'warning' = 'success';
  duration: number = 3000;
  visible: boolean = false;

  private timeoutRef: any;

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.toastService.toastState$.subscribe((data: ToastData) => {
      this.show(data.message, data.variant, data.duration);
    });
  }

  show(message: string, variant: 'success' | 'error' | 'warning', duration: number) {
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

