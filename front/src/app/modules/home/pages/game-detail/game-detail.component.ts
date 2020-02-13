import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GameService } from '../../../../core/services/game/game.service';

import { Game } from '../../../../shared/models/game.model';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  game: Game;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService) { }

  ngOnInit(): void {
    this.getDetail();
  }

  getDetail(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.gameService.find(id).subscribe(game => this.game = game);
  }

}
