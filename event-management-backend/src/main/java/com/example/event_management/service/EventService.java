package com.example.event_management.service;

import com.example.event_management.data.entities.Event;
import org.springframework.data.domain.Page;

import javax.swing.border.EmptyBorder;
import java.util.List;

public interface EventService {
    Event createEvent(Event event,Integer categoryId);

    Page<Event> getAllEvents(int page, int size);



    Event getEventById(int id);

    Event updateEvent(int id, Event updatedEvent);
    List<Event> getEventByName(String name);
    void deleteEvent(int id);
}
