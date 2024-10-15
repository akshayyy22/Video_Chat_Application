import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from '../../../node_modules/rxjs/dist/types/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket('ws://localhost:3000');
  }

  joinRoom(roomId: number) {
    this.socket$.next({ event: 'joinRoom', data: { roomId } });
  }

  leaveRoom(roomId: number) {
    this.socket$.next({ event: 'leaveRoom', data: { roomId } });
  }

  onEvent(event: string) {
    return this.socket$.asObservable();
  }
}
