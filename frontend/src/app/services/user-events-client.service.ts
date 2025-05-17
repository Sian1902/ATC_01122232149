import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { Event } from './event-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserEventService {
  private baseUrl = 'http://localhost:8080/user/Events';
  private id: number = 0;

  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.user$.subscribe((user) => {
      if (user) {
        this.id = user.id;
      }
    });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getSavedEvents(): Observable<Event[]> {
    if (this.id === 0) {
      return of([]); // Fallback if user ID is not set
    }
    return this.http.get<Event[]>(`${this.baseUrl}/${this.id}/liked`, {
      headers: this.getAuthHeaders()
    });
  }

  getBookedEvents(): Observable<Event[]> {
    if (this.id === 0) {
      return of([]); // Fallback if user ID is not set
    }
    return this.http.get<Event[]>(`${this.baseUrl}/${this.id}/booked`, {
      headers: this.getAuthHeaders()
    });
  }

  addBookedEvent(eventId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${this.id}/booked/${eventId}`, {}, {
      headers: this.getAuthHeaders()
    });
  }

  addSavedEvent(eventId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${this.id}/liked/${eventId}`, {}, {
      headers: this.getAuthHeaders()
    });
  }
}