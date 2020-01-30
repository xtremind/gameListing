import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../core/services/game/game.service';
import { Console } from '../../models/console.model';
import { Game } from '../../models/game.model';

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
    //this.gameService.getGames().subscribe(games => this.games = games);
  }

  onSelect(game: Game): void {
    this.selectedGame = game;
  }
}
