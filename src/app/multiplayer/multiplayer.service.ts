import * as io from 'socket.io-client';
import {
  Injectable
} from '@angular/core';

@Injectable()
export class MultiplayerService {

  public socket;
  private ws_url = 'http://localhost:3000';

  constructor() {
  }

  get socket() {
    return this.socket;
  }

  openSocket() {
    if (this.socket) {
      this.closeSocket();
    }

    this.socket = io(this.ws_url);
  }

  closeSocket() {
    this.socket && this.socket.close();
  }

}
