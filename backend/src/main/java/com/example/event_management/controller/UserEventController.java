package com.example.event_management.controller;

import com.example.event_management.data.entities.Event;
import com.example.event_management.data.entities.User;
import com.example.event_management.data.repositories.EventRepository;
import com.example.event_management.data.repositories.UserRepository;
import com.example.event_management.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("user/Events")
public class UserEventController {
    private final UserService userService;

    public UserEventController(UserService userService) {
        this.userService = userService;
    }
    // 🔸 Add booked event
    @PostMapping("/{userId}/booked/{eventId}")
    public void addBookedEvent(@PathVariable int userId, @PathVariable int eventId) {
        userService.addBookedEvent(userId, eventId);

    }

    // 🔸 Add liked event
    @PostMapping("/{userId}/liked/{eventId}")
    public void addLikedEvent(@PathVariable int userId, @PathVariable int eventId) {
        userService.addLikedEvent(userId, eventId);

    }
    @GetMapping("/{userId}/booked")
    public List<Event> getBookedEvents(@PathVariable int userId) {
        return userService.getBookedEventDetails(userId);
    }

    @GetMapping("/{userId}/liked")
    public List<Event> getLikedEvents(@PathVariable int userId) {
        return userService.getLikedEventDetails(userId);
    }







}
