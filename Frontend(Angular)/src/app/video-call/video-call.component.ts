import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../shared/websocket.service';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
})
export class VideoCallComponent implements OnInit {
  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.webSocketService.onEvent('userJoined').subscribe((data) => {
      console.log('A user joined the room', data);
    });
  }

  joinRoom(roomId: number) {
    this.webSocketService.joinRoom(roomId);
  }

  leaveRoom(roomId: number) {
    this.webSocketService.leaveRoom(roomId);
  }
}
