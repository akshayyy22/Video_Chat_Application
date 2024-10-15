// src/app/chat-room/chat-room.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ChatRoom {
  id: number;
  name: string;
  createdAt: string;
}

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  chatRooms: ChatRoom[] = [];
  newChatRoomName: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getChatRooms();
  }

  getChatRooms() {
    this.http.get<ChatRoom[]>('http://localhost:3000/chatrooms')
      .subscribe({
        next: (response) => {
          this.chatRooms = response;
        },
        error: (error) => {
          console.error('Error retrieving chat rooms', error);
        }
      });
  }

  createChatRoom() {
    const token = localStorage.getItem('token');
    this.http.post('http://localhost:3000/chatrooms', { name: this.newChatRoomName }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (response) => {
        console.log('Chat room created', response);
        this.newChatRoomName = '';
        this.getChatRooms(); // Refresh the chat room list
      },
      error: (error) => {
        console.error('Error creating chat room', error);
      }
    });
  }
}
