import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()
export class Unsub implements OnDestroy {
  unsubscribe$ = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
