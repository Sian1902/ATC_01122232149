import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { UserEventService } from './user-events-client.service';
import { Event } from './event-client.service';
import { EventData } from '../components/event-card/event-model';

// Type alias for forkJoin result
interface EventResults {
  saved: Event[];
  booked: Event[];
}

@Injectable({
  providedIn: 'root'
})
export class HandleSavedBookedService {
  private savedEvents$ = new BehaviorSubject<EventData[]>([]);
  private bookedEvents$ = new BehaviorSubject<EventData[]>([]);

  constructor(private userEventService: UserEventService) {}

  getSavedEvents$() {
    return this.savedEvents$.asObservable();
  }

  getBookedEvents$() {
    return this.bookedEvents$.asObservable();
  }

  loadEvents(): void {
    forkJoin({
      saved: this.userEventService.getSavedEvents(),
      booked: this.userEventService.getBookedEvents()
    }).pipe(
      take(1),
      catchError(error => {
        console.error('Error loading events:', error);
        return of({ saved: [], booked: [] });
      })
    ).subscribe(
      (result) => {
        const eventMap = new Map<number, EventData>();

        result.saved.forEach(event => {
          eventMap.set(event.id, {
            ...this.mapEventToEventData(event),
            isSaved: true,
            isBooked: false
          });
        });

        result.booked.forEach(event => {
          const existingEvent = eventMap.get(event.id);
          if (existingEvent) {
            existingEvent.isBooked = true;
          } else {
            eventMap.set(event.id, {
              ...this.mapEventToEventData(event),
              isSaved: false,
              isBooked: true
            });
          }
        });

        const allEvents = Array.from(eventMap.values());
        this.savedEvents$.next(allEvents.filter(e => e.isSaved));
        this.bookedEvents$.next(allEvents.filter(e => e.isBooked));
      },
      (err) => console.error('Error processing events:', err)
    );
  }

  private mapEventToEventData(event: Event): Omit<EventData, 'isSaved' | 'isBooked'> {
    return {
      id: event.id,
      title: event.name,
      date: event.date,
      location: event.venue || '',
      description: event.description || ''
    };
  }

  addRemoveSavedEvent(event: EventData): void {
    this.userEventService.addSavedEvent(event.id).subscribe(
      () => {
        event.isSaved = !event.isSaved;
        if (event.isSaved) {
          this.savedEvents$.next([...this.savedEvents$.getValue(), event]);
        } else {
          this.savedEvents$.next(this.savedEvents$.getValue().filter(e => e.id !== event.id));
        }
      },
      (error) => {
        console.error('Error adding/removing saved event:', error);
      }
    );
  }
  addRemoveBookedEvent(event: EventData): void {
    this.userEventService.addBookedEvent(event.id).subscribe(
      () => {
        event.isBooked = !event.isBooked;
        if (event.isBooked) {
          this.bookedEvents$.next([...this.bookedEvents$.getValue(), event]);
        } else {
          this.bookedEvents$.next(this.bookedEvents$.getValue().filter(e => e.id !== event.id));
        }
      },
      (error) => {
        console.error('Error adding/removing booked event:', error);
      }
    );
  }

}