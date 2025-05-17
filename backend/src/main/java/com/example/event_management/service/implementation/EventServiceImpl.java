package com.example.event_management.service.implementation;

import com.example.event_management.data.entities.Category;
import com.example.event_management.data.entities.Event;
import com.example.event_management.data.repositories.CategoryRepository;
import com.example.event_management.data.repositories.EventRepository;
import com.example.event_management.exception.NotFoundException;
import com.example.event_management.service.EventService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final CategoryRepository categoryRepository;

    public EventServiceImpl(EventRepository eventRepository, CategoryRepository categoryRepository) {
        this.eventRepository = eventRepository;
        this.categoryRepository = categoryRepository;
    }
    @Override
    public Event createEvent(Event event, Integer categoryId) {
        if (categoryId != null) {
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new NotFoundException("Category not found"));
            event.setCategory(category);
        }
        return eventRepository.save(event);
    }

    @Override
    public Page<Event> getAllEvents(int page, int size) {
        return eventRepository.findAll(PageRequest.of(page, size));
    }



    @Override
    public Event getEventById(int id) {
        return eventRepository.findById(id).orElseThrow(() -> new NotFoundException("Event not found with ID: " + id));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Event updateEvent(int id, Event updatedEvent) {
        if (!eventRepository.existsById(id)) {
            throw new NotFoundException("Cannot update. Event not found with ID: " + id);
        }
        updatedEvent.setId(id);
        return eventRepository.save(updatedEvent);
    }

    @Override
    public List<Event> getEventByName(String name) {
        return eventRepository.findByNameContainingIgnoreCase(name);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteEvent(int id) {
        if (!eventRepository.existsById(id)) {
            throw new NotFoundException("Cannot delete. Event not found with ID: " + id);
        }
        eventRepository.deleteById(id);
    }
}
