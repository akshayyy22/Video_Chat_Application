import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from './chatroom.entity';
import  ChatRoomService  from './chatroom.service';
import { ChatRoomController } from './chatroom.controller';
import { ChatRoomGateway } from './chatroom.gateway';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatRoom]),  // Register ChatRoom entity here
    JwtModule,  // Import JwtModule here
  ],
  controllers: [ChatRoomController],
  providers: [ChatRoomService, ChatRoomGateway],
  exports: [ChatRoomService],  // Export service if needed in other modules
})
export class ChatRoomModule {}
