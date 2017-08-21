import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LobbyComponent } from './lobby.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [LobbyComponent]
})
export class LobbyModule { }
