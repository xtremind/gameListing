import { Component, OnInit } from '@angular/core';
import { Game } from '../../domain/game';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  //game = 'Zelda';
  game : Game = {
    id: 1,
    name: 'Zelda'
  };

  constructor() { }

  ngOnInit() {
  }

}
