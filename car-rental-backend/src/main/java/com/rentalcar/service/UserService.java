package com.rentalcar.service;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.rentalcar.Entity.User;
import com.rentalcar.dto.LoginRequest;
import com.rentalcar.dto.LoginResponse;
import com.rentalcar.dto.RegisterRequest;
import com.rentalcar.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    public ResponseEntity<?> registerUser(RegisterRequest req) {
        if (userRepo.findByEmail(req.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered.");
        }

        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
       user.setRole("USER");
      //  user.setRole(req.getRole());

        userRepo.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    public ResponseEntity<?> loginUser(LoginRequest req) {
        Optional<User> userOpt = userRepo.findByEmail(req.getEmail());

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(req.getPassword(), user.getPassword())) {
                LoginResponse response = new LoginResponse(
                    user.getId(),
                    user.getName(),
                    user.getEmail(),
                    user.getRole()
                );
                return ResponseEntity.ok(response);  // It is return DTO not a Entity 
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
    
    public boolean isEmailRegistered(String email) {
        return userRepo.findByEmail(email).isPresent();
    }
    
    public void updatePassword(String email, String rawPassword) {
        Optional<User> optionalUser = userRepo.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setPassword(passwordEncoder.encode(rawPassword));
            userRepo.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }
}