import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  constructor(
    private Router: Router
  ) { }

  ngOnInit() {
    const name = localStorage.getItem('name');
    if (!name) {
      this.Router.navigate(['home']);
    }
  }
}
