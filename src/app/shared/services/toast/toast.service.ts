import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


export interface ToastData {
  message: string;
  variant: 'success' | 'error' | 'warning';
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<ToastData>();
  toastState$ = this.toastSubject.asObservable();

  show(message: string, variant: 'success' | 'error' | 'warning' = 'success', duration: number = 3000) {
    this.toastSubject.next({ message, variant, duration });
  }

}
