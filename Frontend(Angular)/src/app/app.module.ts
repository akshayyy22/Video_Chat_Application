import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './auth/register.component';
import { LoginComponent } from './auth/login.component';
import { ChatRoomComponent } from './chatroom/chatroom.component';
import { NavigationComponent } from './navigation/navigation.component'; // Ensure correct import path




@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ChatRoomComponent,
    NavigationComponent // Ensure NavigationComponent is declared here
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'register', component: RegistrationComponent },
      { path: 'login', component: LoginComponent },
      { path: 'chatrooms', component: ChatRoomComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
