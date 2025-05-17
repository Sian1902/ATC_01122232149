package com.example.event_management.data.entities;

import com.example.event_management.data.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false)
    private String name; // New name field added

    @ElementCollection
    @CollectionTable(name = "user_booked_events", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "event_id")
    private List<Integer> bookedEvents;

    @ElementCollection
    @CollectionTable(name = "user_liked_events", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "event_id")
    private List<Integer> likedEvents;
}
