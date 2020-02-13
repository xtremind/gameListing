import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Game } from '../../../shared/models/game.model';

import sample from '../../../../assets/data/sample.json';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  findAll(): Observable<Game[]> {
    // console.log(sample);
    return of(sample.consoles.map(console => console.games).flat());
  }

  find(id: number): Observable<Game> {
    return of(sample.consoles.map(console => console.games).flat().find(game => Number(game.id) === id));
  }
}
