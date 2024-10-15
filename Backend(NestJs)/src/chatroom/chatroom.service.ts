import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoom } from './chatroom.entity';
@Injectable()
export default class ChatRoomService {
  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,
  ) {}

  async createChatRoom(name: string, userId: number): Promise<ChatRoom> {
    const chatRoom = this.chatRoomRepository.create({ name, userId });
    return this.chatRoomRepository.save(chatRoom);
  }

  async getAllChatRooms(): Promise<ChatRoom[]> {
    return this.chatRoomRepository.find();
  }

  async getChatRoomById(id: number): Promise<ChatRoom> {
    return this.chatRoomRepository.findOne({ where: { id } }); // Use 'where' clause
  }
}
