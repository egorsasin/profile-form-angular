import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject, Observable, combineLatest } from 'rxjs';
import { takeUntil, map, debounceTime, startWith, shareReplay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as isEqual from 'fast-deep-equal';

import { AppState, currentProfile } from '../reducers';

export function checkDirty<T>(state: Observable<T>) {
  return function<U>(changes: Observable<U>) {
    
    return combineLatest(changes, state).pipe(
      debounceTime(300),
      map(([changes, state]) => isEqual(changes, state) === false),
      startWith(false),
      shareReplay(1))
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private destroyed = new Subject();
  public isDirty: Observable<boolean>;

  private profileForm = new FormGroup({
    name: new FormControl(null),
    email: new FormControl(null),
    notify: new FormControl(null),
  })

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(currentProfile).pipe(
      takeUntil(this.destroyed)
    ).subscribe(
      store => this.profileForm.patchValue(store)
    );

    this.isDirty = this.profileForm.valueChanges.pipe(
      checkDirty(this.store.select(currentProfile))
    )
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete;
  }

}
