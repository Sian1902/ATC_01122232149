import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from '../event-card/event-card.component';
import { EventData } from '../event-card/event-model';
import { EventService } from '../../services/event.service';
import { Observable } from 'rxjs';
import { HandleSavedBookedService } from '../../services/handle-saved-booked.service';

@Component({
  selector: 'app-event-grid',
  standalone: true,
  imports: [CommonModule, EventCardComponent],
  templateUrl: './event-grid.component.html'
})
export class EventGridComponent implements OnInit, OnChanges {
  @Input() filter: string = '';
  @Input() selectedTab: string = 'Home';

  events$: Observable<EventData[]> | undefined; // Default to Home events

  constructor(
    private eventService: EventService,
    private handler: HandleSavedBookedService
  ) {}

  ngOnInit(): void {
    this.events$ = this.eventService.getEvents$(); // Initialize after eventService is available
    this.loadEvents();              // Load Home events
    this.handler.loadEvents();  // Load Saved/Booked events once
  }

  ngOnChanges(changes: SimpleChanges): void {
   
     if (changes['selectedTab']) {
    this.onTabChanged(this.selectedTab);
    }
    if (changes['filter'] && this.selectedTab === 'Home') {
      this.loadEvents();
    }
   
  }

  loadEvents(): void {
    const filterValue = this.filter?.toLowerCase() ?? '';
    this.eventService.getEvents(0, 20, filterValue);
  }

  toggleSave(event: EventData): void {
    event.isSaved = !event.isSaved;
    this.handler.addRemoveSavedEvent(event);
  }

  bookEvent(event: EventData): void {
    event.isBooked = !event.isBooked;
    this.handler.addRemoveBookedEvent(event);

  }

  onTabChanged(tab: string): void {
    this.selectedTab = tab;
    switch (tab) {
      case 'home':
        this.events$ = this.eventService.getEvents$();
        this.loadEvents(); // refresh with current filter
        
        break;
      case 'saved':
        this.events$ = this.handler.getSavedEvents$();
      

        break;
      case 'booked':
        this.events$ = this.handler.getBookedEvents$();

        break;
    }
  }
}
