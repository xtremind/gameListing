import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Console } from '../../../shared/models/console.model';

import sample from '../../../../assets/data/sample.json';


@Injectable({
  providedIn: 'root'
})
export class ConsoleService {

  constructor() { }

  findAll(): Observable<Console[]> {
    // console.log(sample);
    return of(sample.consoles.map(console => <Console>{name: console.name, version: console.version}));
  }
}
