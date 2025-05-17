import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Import or define SignUpDTO and SignInDTO
export interface SignUpDTO {
  // define the properties according to your requirements
  name: string;
  password: string;
  email?: string;
}

export interface SignInDTO {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private baseUrl = 'http://localhost:8080/auth'
  constructor(private httpClient:HttpClient) { }
  signUp(data: SignUpDTO): Observable<string> {
    return this.httpClient.post(this.baseUrl + '/signup', data, { responseType: 'text' });
  }

  signIn(data: SignInDTO): Observable<string> {
    return this.httpClient.post(this.baseUrl + '/signin', data, { responseType: 'text' });
  }
}
