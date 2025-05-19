import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuerySearchService {
  private clearQuerySubject = new Subject<void>();

  // Observable for components to subscribe
  clearQuery$ = this.clearQuerySubject.asObservable();

  // Method to trigger clear action
  clearQuery(): void {
    this.clearQuerySubject.next();
  }
}
