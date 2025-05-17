package com.example.event_management.service;

import com.example.event_management.data.dto.SignInResponse;
import com.example.event_management.data.entities.Event;
import com.example.event_management.data.entities.User;
import com.example.event_management.data.dto.SignInDTO;
import com.example.event_management.data.dto.SignUpDTO;

import java.util.List;

public interface UserService {
    User signUp(SignUpDTO signUpDTO);
    SignInResponse signIn(SignInDTO signInDTO);

    List<Event> getBookedEventDetails(int userId);

    List<Event> getLikedEventDetails(int userId);

    void addLikedEvent(int userId, int eventId);

    void addBookedEvent(int userId, int eventId);
}

