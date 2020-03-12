import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';


import { GameService } from '../../../../core/services/game/game.service';

import { Game } from '../../../../shared/models/game.model';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit, AfterContentInit {

  game: Game;
  chartData = [];

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
      // FIXME : doesn't display icon
      iconRegistry.addSvgIcon(
        'expand_more', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/expand_more-24px.svg'));
      iconRegistry.addSvgIcon(
        'expand_less', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/expand_less-24px.svg'));
    }

  ngOnInit(): void {
    this.getDetail();
  }

  ngAfterContentInit() {
    this.prepareChart();
  }

  getDetail(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.gameService.find(id).subscribe(game => this.game = game);
  }

  prepareChart(): void {
    //
  }

  // TODO : add event listener for click on "lire plus" button
}
