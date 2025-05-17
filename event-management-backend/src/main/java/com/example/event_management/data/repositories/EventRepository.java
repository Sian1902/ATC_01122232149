package com.example.event_management.data.repositories;

import com.example.event_management.data.entities.Event;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {
    // Partial match for event name (title)
    List<Event> findByNameContainingIgnoreCase(String name);
}
