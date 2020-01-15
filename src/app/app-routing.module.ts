import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConsoleComponent } from './console/console.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  { path: '', redirectTo: 'console', pathMatch: 'full' },
  { path: 'console', component: ConsoleComponent },
  { path: 'game/:console', component: GameComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
