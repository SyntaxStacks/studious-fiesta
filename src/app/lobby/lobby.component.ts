import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  public username;
  constructor(
    private Router: Router
  ) { }

  ngOnInit() {
    this.username = localStorage.getItem('name');
    if (!this.username) {
      this.Router.navigate(['home']);
    }
  }

  play () {
    this.Router.navigate(['game']);
  }
}
