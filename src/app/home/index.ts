import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MdButtonModule,
  MdInputModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule ,
    MdButtonModule,
    MdInputModule,
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
