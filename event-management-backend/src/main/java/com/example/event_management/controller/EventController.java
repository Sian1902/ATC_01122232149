package com.example.event_management.controller;

import com.example.event_management.data.dto.EventRequest;
import com.example.event_management.data.entities.Event;
import com.example.event_management.service.EventService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
@CrossOrigin(origins = "*")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Event createEvent(@RequestBody EventRequest eventRequest) {
        Event event = new Event();
        event.setName(eventRequest.getName());
        event.setDescription(eventRequest.getDescription());
        event.setDate(eventRequest.getDate());
        event.setVenue(eventRequest.getVenue());
        event.setPrice(eventRequest.getPrice());

        return eventService.createEvent(event, eventRequest.getCategoryId());
    }


    @GetMapping
    public Page<Event> getEvents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String name) {

        if (name != null && !name.isEmpty()) {
            List<Event> events = eventService.getEventByName(name);
            return new PageImpl<>(events);
        } else {
            return eventService.getAllEvents(page, size);
        }
    }

    @GetMapping("/{id}")
    public Event getEventById(@PathVariable int id) {
        return eventService.getEventById(id);
    }

    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable int id, @RequestBody Event updatedEvent) {

        return eventService.updateEvent(id, updatedEvent);

    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable int id) {

        eventService.deleteEvent(id);

    }
}
