import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { GameComponent } from './game.component';
import {
  MdSidenavModule,
  MdRadioModule,
  MdButtonModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
    MdSidenavModule,
    MdRadioModule,
    MdButtonModule
  ],
  declarations: [GameComponent]
})
export class GameModule { }
