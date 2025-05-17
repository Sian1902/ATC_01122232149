// src/app/pages/event-details/event-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventClientService } from '../../services/event-client.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
onBookEvent() {
throw new Error('Method not implemented.');
}
onSaveEvent() {
throw new Error('Method not implemented.');
}
  eventId!: string;
  event: any; // Replace `any` with your Event type if available
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventClientService
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id')!;
    this.fetchEvent();
  }

  fetchEvent() {
    this.eventService.getEventById(parseInt(this.eventId)).subscribe({
      next: (res) => {
        this.event = {
          id: res.id,
          name: res.name,
          date: res.date,
          location: res.venue,
          description: res.description
        };
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Could not load event details.';
        this.loading = false;
      }
    });
  }
}
