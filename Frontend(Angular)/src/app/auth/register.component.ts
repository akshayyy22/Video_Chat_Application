// src/app/registration/registration.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    this.http.post('http://localhost:3000/auth/register', { username: this.username, password: this.password })
      .subscribe({
        next: (response) => {
          console.log('User registered', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error registering user', error);
        }
      });
  }
}
