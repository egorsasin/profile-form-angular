import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { map, switchMap, take } from 'rxjs/operators';
import { pipe } from '@angular/core/src/render3';

export interface DirtyComponent {
  isDirty: Observable<boolean>
}

@Injectable({
  providedIn: 'root'
})
export class DirtyCheckGuard implements CanDeactivate<DirtyComponent> {

  constructor (
    private modalService: NgbModal
  ) {}

  canDeactivate(component: DirtyComponent) {
    console.log(component);
    return component.isDirty.pipe(
      switchMap((dirty: boolean) => {
        console.log(dirty);
        if (dirty === false) {
          return of(true);
        }
        const modalRef = this.modalService.open(ModalComponent);
        return from(modalRef.result)
      }),
      take(1)
    )    
  }
  
}
