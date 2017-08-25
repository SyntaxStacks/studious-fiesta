import {
  Component,
  OnInit,
  OnDestroy,
  Renderer2,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { MultiplayerService } from '../multiplayer/multiplayer.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit, OnDestroy {

  public chatMessages = [];
  public userList = [];
  public username;
  public readyToPlay = true;

  @ViewChild('chatMessage') chatMessage;

  constructor(
    private Router: Router,
    private MultiplayerService: MultiplayerService,
    private Renderer2: Renderer2
  ) { }

  ngOnInit() {
    this.username = localStorage.getItem('name');
    if (!this.username) {
      return this.Router.navigate(['home']);
    }
    this.userList.push({ username: this.username });
    this.MultiplayerService.openSocket();
    this.configureSocketEvents();
  }

  ngOnDestroy() {
    // this.MultiplayerService.closeSocket();
  }

  configureSocketEvents() {
    const socket = this.MultiplayerService.socket;
    socket.on('enter', this.setupLobby.bind(this));
    socket.on('chat', this.message.bind(this));
    socket.on('userEnter', this.newUser.bind(this));
    socket.on('leave', this.leave.bind(this));
    socket.on('game-start-ready', this.goToMultiplayerGame.bind(this));
    socket.emit('join', this.join());
  }


  goToMultiplayerGame() {
    if (this.readyToPlay) {
      // return this.Router.navigate(['online']);
    }
  }

  sendChat (message) {
    this.MultiplayerService.socket.emit('chat', { message });
    this.message({ username: this.username, message });
    // TODO fix hackiness
    // this.Renderer2.setAttribute(this.chatMessage.nativeElement, 'value', '');
    this.chatMessage.nativeElement.value = '';
  }

  message(data) {
    // add chat message to dom
    this.chatMessages.push({
      username: data.username,
      message: data.message
    });
  }

  setupLobby(data) {
    data.users.forEach((u) => {
      this.userList.push({ username: u.username });
    });
  }

  join() {
    return {
      username: this.username
    };
  }

  leave(data) {
    this .userList = this.userList.filter((u) => {
      return u.username !== data.username;
    });
  }

  newUser(data) {
    this.userList.push({ username: data.username });
  }
}
