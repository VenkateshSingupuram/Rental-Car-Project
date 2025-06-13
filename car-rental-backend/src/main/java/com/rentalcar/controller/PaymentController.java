package com.rentalcar.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin("*")
public class PaymentController {

    @PostMapping("/process")
    public ResponseEntity<String> processPayment() {
        // This can be expanded with Razorpay/PayU in future
        return ResponseEntity.ok("Payment processed successfully.");
    }
}