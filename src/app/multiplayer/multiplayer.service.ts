import * as io from 'socket.io-client';
import {
  Injectable
} from '@angular/core';

@Injectable()
export class MultiplayerService {

  private _socket;
  private ws_url = '/ws/socket.io/';

  constructor() {
  }

  get socket() {
    return this._socket;
  }

  openSocket() {
    if (this.socket) {
      this.closeSocket();
    }

    this._socket = io('/', {
      path: this.ws_url
    });
  }

  closeSocket() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
