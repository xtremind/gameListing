import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Console } from '../../../shared/models/console.model';

import sample from '../../../../assets/data/sample.json';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {

  constructor() { }

  private getSamples(): Console[] {
    return sample.consoles.map(
      (console: Console) => ({id: console.name, name: console.name.replace('-', ' '), version: console.version}));
  }

  findAll(): Observable<Console[]> {
    // console.log(sample);
    return of(this.getSamples());
  }

  find(id: string): Observable<Console> {
    return of(this.getSamples().find((console: Console) => console.id === id));
  }
}
