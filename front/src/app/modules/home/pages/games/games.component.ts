import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../../core/services/game/game.service';
import { Game } from '../../../../shared/models/game.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: Game[];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.gameService.findAll().subscribe(games => this.games = games);
  }
}
