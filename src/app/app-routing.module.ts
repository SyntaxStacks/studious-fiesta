import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { LobbyComponent } from './lobby/lobby.component';

export const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'home'
}, {
  path: 'home',
  pathMatch: 'full',
  component: HomeComponent
}, {
  path: 'game',
  pathMatch: 'full',
  component: GameComponent
}, {
  path: 'lobby',
  pathMatch: 'full',
  component: LobbyComponent
}, {
  path: '**',
  pathMatch: 'full',
  redirectTo: 'home'
}];

@NgModule ({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}

