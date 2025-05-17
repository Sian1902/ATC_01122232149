import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EventData } from './event-model';
import { CommonModule, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { UserEventService } from '../../services/user-events-client.service';

@Component({
  selector: 'app-event-card',
  imports: [NgClass,CommonModule],
  templateUrl: './event-card.component.html',
  standalone: true
})
export class EventCardComponent {
  @Input() event!: EventData;
  @Output() onSave = new EventEmitter<EventData>();
  @Output() onBook = new EventEmitter<EventData>();

  showDescription = false;
  constructor(private router: Router,private userEvent:UserEventService) {}

  openDetails() {
    this.router.navigate(['/events', this.event.id]);
  }
  saveClicked() {
    this.onSave.emit(this.event);
  }

  bookClicked() {
    this.onBook.emit(this.event);
  }
}
