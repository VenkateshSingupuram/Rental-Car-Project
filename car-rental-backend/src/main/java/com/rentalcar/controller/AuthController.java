package com.rentalcar.controller;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rentalcar.dto.LoginRequest;
import com.rentalcar.dto.RegisterRequest;
import com.rentalcar.dto.ResetPasswordRequest;
import com.rentalcar.service.OtpService;
import com.rentalcar.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

	 @Autowired
	  private OtpService otpService;
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        return userService.registerUser(registerRequest);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        return userService.loginUser(loginRequest);
    }
    
    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        if (userService.isEmailRegistered(email)) {
            otpService.generateAndSendOtp(email);
            return ResponseEntity.ok("OTP sent to email");
        } else {
            return ResponseEntity.badRequest().body("Email not registered");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest req) {
        boolean valid = otpService.verifyOtp(req.getEmail(), req.getOtp());
        if (!valid) {
            return ResponseEntity.badRequest().body("Invalid OTP");
        }
        userService.updatePassword(req.getEmail(), req.getNewPassword());
        return ResponseEntity.ok("Password updated successfully");
    }
}