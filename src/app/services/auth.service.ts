import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginDto, RegisterDto } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://localhost:5001/api/auth';
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
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
