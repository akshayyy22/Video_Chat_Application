import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import  ChatRoomService  from './chatroom.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChatRoomGateway } from './chatroom.gateway';
import { CreateChatRoomDto } from './dto/create-chatroom.dto';
@Controller('chatrooms')
export class ChatRoomController {
  constructor(
    private readonly chatRoomService: ChatRoomService,
    private readonly chatRoomGateway: ChatRoomGateway
  ) {}

  // Create a new chat room
  @Post()
  async createChatRoom(@Body() createChatRoomDto: CreateChatRoomDto) {
    const { name, userId } = createChatRoomDto;  // Destructure the DTO
    const chatRoom = await this.chatRoomService.createChatRoom(name, userId);  // Pass both name and userId to the service
    this.chatRoomGateway.server.emit('newRoom', chatRoom);  // Emit an event to notify new room creation
    return chatRoom;  // Return the created chat room
  }

  // Get all chat rooms
  @Get()
  async getAllChatRooms() {
    return this.chatRoomService.getAllChatRooms();
  }

  // Get details of a specific chat room by ID
  @Get(':id')
  async getChatRoom(@Param('id') id: number) {
    return this.chatRoomService.getChatRoomById(id);
  }
}
