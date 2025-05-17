package com.example.event_management.data.dto;

import com.example.event_management.data.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SignInResponse {
    private String token;
    private User user;


}
