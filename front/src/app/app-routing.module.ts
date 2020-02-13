import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './modules/home/pages/dashboard/dashboard.component';
import { ConsolesComponent } from './modules/home/pages/consoles/consoles.component';
import { ConsoleDetailComponent } from './modules/home/pages/console-detail/console-detail.component';
import { GamesComponent } from './modules/home/pages/games/games.component';
import { GameDetailComponent } from './modules/home/pages/game-detail/game-detail.component';
import { Page404Component } from './modules/home/pages/error/page404/page404.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'consoles', component: ConsolesComponent },
  { path: 'console/:id', component: ConsoleDetailComponent },
  { path: 'games', component: GamesComponent },
  { path: 'game/:id', component: GameDetailComponent },
  { path: '**', component: Page404Component }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
