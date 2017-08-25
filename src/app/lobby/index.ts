import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LobbyComponent } from './lobby.component';
import {
  MdButtonModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MdButtonModule,
  ],
  declarations: [LobbyComponent]
})
export class LobbyModule { }
