import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Filter } from '../interface/characters';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filterSubject = new Subject<Filter>();
  filter$ = this.filterSubject.asObservable();

  updateFilter(filter: Filter) {
    this.filterSubject.next(filter);
  }
}
