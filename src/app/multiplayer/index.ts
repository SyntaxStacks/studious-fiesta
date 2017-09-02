import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { MultiplayerComponent } from './multiplayer.component';
import { MultiplayerService } from './multiplayer.service';
import {
  MdSidenavModule,
  MdRadioModule,
  MdButtonModule
} from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
    MdSidenavModule,
    MdRadioModule,
    MdButtonModule
  ],
  declarations: [MultiplayerComponent],
  providers: [ MultiplayerService ]
})
export class MultiplayerModule { }
