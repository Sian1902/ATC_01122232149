package com.example.event_management.controller;
import com.example.event_management.data.dto.SignInDTO;
import com.example.event_management.data.dto.SignInResponse;
import com.example.event_management.data.dto.SignUpDTO;
import com.example.event_management.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Sign-up endpoint
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody SignUpDTO signUpDTO) {

            userService.signUp(signUpDTO);
            return ResponseEntity.ok("User signed up successfully");

    }

    // Sign-in endpoint
    @PostMapping("/signin")
    public SignInResponse signIn(@RequestBody SignInDTO signInDTO) {
        return userService.signIn(signInDTO);
    }
}

