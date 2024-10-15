import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private TOKEN_KEY = 'auth-token';

  public saveToken(token: string): void {
    window.localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(this.TOKEN_KEY);
  }

  public clearToken(): void {
    window.localStorage.removeItem(this.TOKEN_KEY);
  }
}
