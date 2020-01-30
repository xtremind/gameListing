import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from '../domain/game';

export const GAMES: Game[] = [
    { id: 11, name: 'Super Mario Bros', console: 'Nes'},
    { id: 12, name: 'Zelda', console: 'Gba' },
    { id: 13, name: 'Contra', console: 'Nes'},
    { id: 14, name: 'Metroid', console: 'Gba' }
  ];

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  getGames(console): Observable<Game[]> {
    return of(GAMES.filter(game => game.console === console));
  }

  getGame(id): Observable<Game> {
    return of(GAMES.find(game => game.id === id));
  }
}
