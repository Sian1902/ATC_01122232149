package com.example.event_management.data.dto;

import lombok.Data;

@Data
public class SignUpDTO {
    private String email;
    private String password;
    private String name;  // Added name
}