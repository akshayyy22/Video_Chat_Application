import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ChatRoomController } from './chatroom/chatroom.controller';
// import { ChatRoomService } from './chatroom/chatroom.service';
import { ChatRoom } from './chatroom/chatroom.entity';
import { ChatRoomGateway } from './chatroom/chatroom.gateway';
import { AuthModule } from './auth/auth.module'; 
import { User } from './auth/entities/user.entity'; 
import { ChatRoomModule } from './chatroom/chatroom.module'; 
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [ChatRoom, User],  
      synchronize: true,  
    }),
    ConfigModule.forRoot({ isGlobal: true }), 
    AuthModule,  
    ChatRoomModule, 
  ],
  // controllers: [ChatRoomController],  
  providers: [ChatRoomGateway], 
})
export class AppModule {}
