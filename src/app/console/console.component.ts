import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Console } from '../../domain/console';
import { Game } from '../../domain/game';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {

  console : Console = {id: 1,name: 'Nes'};
  games : Game[];

  selectedGame: Game;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.getGames();
  }

  getGames(): void {
    this.games = this.gameService.getGames();
  }

  onSelect(game: Game): void {
    this.selectedGame = game;
  }
}
