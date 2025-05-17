import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventData } from '../components/event-card/event-model';

export interface EventRequest {
  name: string;
  description?: string;
  date: string;       
  venue?: string;
  price?: number;
  categoryId: number;
}

export interface Event {
  id: number;
  name: string;
  description?: string;
  date: string;
  venue?: string;
  price?: number;
  category?: { id: number; name: string };
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // current page number
}

@Injectable({
  providedIn: 'root'
})
export class EventClientService {
  private baseUrl = 'http://localhost:8080/events';

  constructor(private httpClient: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken') || '';
  
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // GET /events?page=0&size=10&name=someName
  getEvents(page = 0, size = 10, name?: string): Observable<Page<Event>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (name) {
      params = params.set('name', name);
    }

    const headers = this.getAuthHeaders();

    return this.httpClient.get<Page<Event>>(this.baseUrl, { params, headers });
  }

  // GET /events/{id}
  getEventById(id: number): Observable<Event> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get<Event>(`${this.baseUrl}/${id}`, { headers });
  }

  // POST /events
  createEvent(eventRequest: EventRequest): Observable<Event> {
    const headers = this.getAuthHeaders();
    return this.httpClient.post<Event>(this.baseUrl, eventRequest, { headers });
  }

  // PUT /events/{id}
  updateEvent(id: number, updatedEvent: Partial<EventRequest>): Observable<Event> {
    const headers = this.getAuthHeaders();
    return this.httpClient.put<Event>(`${this.baseUrl}/${id}`, updatedEvent, { headers });
  }

  // DELETE /events/{id}
  deleteEvent(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`, { headers });
  }
}
