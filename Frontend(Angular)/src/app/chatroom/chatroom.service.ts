import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/dist/types';

@Injectable({
  providedIn: 'root',
})
export class ChatRoomService {
  private baseUrl = 'http://localhost:3000/chatrooms';

  constructor(private http: HttpClient) {}

  createChatRoom(name: string): Observable<any> {
    return this.http.post(`${this.baseUrl}`, { name });
  }

  getChatRooms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getChatRoomById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
