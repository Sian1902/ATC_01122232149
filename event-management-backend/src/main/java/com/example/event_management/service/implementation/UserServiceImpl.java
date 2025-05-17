package com.example.event_management.service.implementation;

import com.example.event_management.data.dto.SignInDTO;
import com.example.event_management.data.dto.SignInResponse;
import com.example.event_management.data.dto.SignUpDTO;
import com.example.event_management.data.entities.Event;
import com.example.event_management.data.entities.User;
import com.example.event_management.data.enums.Role;
import com.example.event_management.data.repositories.EventRepository;
import com.example.event_management.data.repositories.UserRepository;
import com.example.event_management.security.JwtTokenUtil;
import com.example.event_management.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil;
    private final EventRepository eventRepository;
    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenUtil jwtTokenUtil,EventRepository eventRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenUtil = jwtTokenUtil;
        this.eventRepository=eventRepository;
    }

    @Override
    public User signUp(SignUpDTO signUpDTO) {
        if (userRepository.existsByEmail(signUpDTO.getEmail())) {
            throw new RuntimeException("Email is already in use");
        }

        User user = new User();
        user.setEmail(signUpDTO.getEmail());
        user.setPassword(passwordEncoder.encode(signUpDTO.getPassword()));
        user.setName(signUpDTO.getName());
        user.setRole(Role.USER); // Ensure case safety

        return userRepository.save(user);
    }

    @Override
    public SignInResponse signIn(SignInDTO signInDTO) {
        Optional<User> userOpt = userRepository.findByEmail(signInDTO.getEmail());

        if (userOpt.isEmpty() || !passwordEncoder.matches(signInDTO.getPassword(), userOpt.get().getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String jwtToken = jwtTokenUtil.generateToken(userOpt.get());
        User user = userOpt.get();
        user.setPassword(null); // avoid sending password back
        return new SignInResponse(jwtToken, user);
    }
    @Override
    public List<Event> getBookedEventDetails(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        return eventRepository.findAllById(user.getBookedEvents());
    }
    @Override
    public List<Event> getLikedEventDetails(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        return eventRepository.findAllById(user.getLikedEvents());
    }

    @Override
    public void addBookedEvent(int userId, int eventId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (!user.getBookedEvents().contains(eventId)) {
            user.getBookedEvents().add(eventId);
            userRepository.save(user);
        }
        else{
            user.getBookedEvents().remove(eventId);
        }
    }

    @Override
    public void addLikedEvent(int userId, int eventId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (!user.getLikedEvents().contains(eventId)) {
            user.getLikedEvents().add(eventId);
            userRepository.save(user);
        }
        else{
            user.getLikedEvents().remove(eventId);
        }
    }
}
