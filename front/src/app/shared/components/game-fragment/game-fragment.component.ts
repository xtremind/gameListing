import { Component, OnInit, Input } from '@angular/core';

import { Game } from '../../../shared/models/game.model';

@Component({
  selector: 'app-game-fragment',
  templateUrl: './game-fragment.component.html',
  styleUrls: ['./game-fragment.component.css']
})
export class GameFragmentComponent implements OnInit {

  @Input() game: Game;


  constructor() { }

  ngOnInit(): void {
  }

}
