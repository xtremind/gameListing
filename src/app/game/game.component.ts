import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { GameService } from '../game.service';
import { Console } from '../../domain/console';
import { Game } from '../../domain/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  console : Console = {id: 1, name: 'Nes'};
  games : Game[];
  selectedGame: Game;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private gameService: GameService) { }

  ngOnInit() {
    this.getGames();
  }

  getGames(): void {
    this.console.name = '' +this.route.snapshot.paramMap.get('console');

    this.gameService.getGames(this.console.name).subscribe(games => this.games = games);
  }

  onSelect(game: Game): void {
    this.selectedGame = game;
  }
}
