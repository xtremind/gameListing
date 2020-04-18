import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MaterialModule } from './modules/home/components/material-module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';



// Pages
import { HomepageComponent } from './modules/home/pages/home/homepage.component';
import { DashboardComponent } from './modules/home/pages/dashboard/dashboard.component';
import { ConsolesComponent } from './modules/home/pages/consoles/consoles.component';
import { ConsoleDetailComponent } from './modules/home/pages/console-detail/console-detail.component';
import { GamesComponent } from './modules/home/pages/games/games.component';
import { GameDetailComponent } from './modules/home/pages/game-detail/game-detail.component';
import { Page404Component } from './modules/home/pages/error/page404/page404.component';

// Router
import { AppRoutingModule } from './app-routing.module';

// Core
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { MenuComponent } from './core/menu/menu.component';

// Fragments
import { ConsoleFragmentComponent } from './shared/components/console-fragment/console-fragment.component';
import { GameFragmentComponent } from './shared/components/game-fragment/game-fragment.component';
import { ChartFragmentComponent } from './shared/components/chart-fragment/chart-fragment.component';


@NgModule({
  declarations: [
    HomepageComponent,
    GamesComponent,
    ConsolesComponent,
    ConsoleDetailComponent,
    GameDetailComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    ConsoleFragmentComponent,
    GameFragmentComponent,
    Page404Component,
    ChartFragmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
  bootstrap: [HomepageComponent]
})

export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));

