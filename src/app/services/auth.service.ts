import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginDto, RegisterDto } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://localhost:5052/api/auth';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  register(data: RegisterDto): Observable<string> {
    return this.http
      .post(this.apiUrl + '/register', data, { responseType: 'text' })
      .pipe(tap((token) => this.setToken(token)));
  }

  login(data: LoginDto): Observable<string> {
    return this.http
      .post(this.apiUrl + '/login', data, { responseType: 'text' })
      .pipe(tap((token) => this.setToken(token)));
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      this.isLoggedInSubject.next(false);
    }
  }

  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('token') : null;
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  //  Safely checks for token presence
  private hasToken(): boolean {
    return this.isBrowser() && !!localStorage.getItem('token');
  }

  //  Safely sets token and login state
  private setToken(token: string) {
    if (this.isBrowser()) {
      localStorage.setItem('token', token);
      this.isLoggedInSubject.next(true);
    }
  }

  //  Shared utility method for SSR safety
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
