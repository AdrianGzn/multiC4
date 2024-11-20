import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }

  private idSubject = new BehaviorSubject<number>(0);
  public id$ = this.idSubject.asObservable(); // Observables para escuchar cambios

  setId(id: number): void {
    this.idSubject.next(id);
  }


  getId(): number {
    return this.idSubject.getValue();
  }
}
