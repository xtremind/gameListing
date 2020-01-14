import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from '../domain/game';

export const GAMES: Game[] = [
    { id: 11, name: 'Super Mario Bros' },
    { id: 12, name: 'Zelda' },
    { id: 13, name: 'Contra' },
    { id: 14, name: 'Metroid' }
  ];

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  getGames(): Observable<Game[]> {
    return of(GAMES);
  }
}
