import { Injectable } from '@angular/core';
import { EventClientService,Event } from './event-client.service';
import { BehaviorSubject } from 'rxjs';
import { EventData } from '../components/event-card/event-model';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private events: BehaviorSubject<EventData[]> = new BehaviorSubject<EventData[]>([]);

  constructor(private eventClient: EventClientService) {}

  mapEventToEventData(event: Event): EventData {
    return {
      id: event.id,
      title: event.name,
      date: event.date,
      location: event.venue || '',
      description: event.description || '',
      isSaved: false,
      isBooked: false
    };
  }

  getEvents(page = 0, size = 20, name?: string) {
    this.eventClient.getEvents(page, size, name).subscribe((response: any) => {
      this.events.next(response.content.map((e: Event) => this.mapEventToEventData(e)));
    });
  }

  getEvents$() {
    return this.events.asObservable();
  }
}
