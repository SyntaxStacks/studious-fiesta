import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdToolbarModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home';
import { GameModule } from './game';
import { LobbyModule } from './lobby';
import { MultiplayerModule } from './multiplayer';
import { MultiplayerService } from './multiplayer/multiplayer.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    AppRoutingModule,
    HomeModule,
    GameModule,
    LobbyModule,
    MultiplayerModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    MultiplayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
