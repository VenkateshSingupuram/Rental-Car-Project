package com.rentalcar.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class OtpService {

	
	   private final Map<String, String> otpStorage = new HashMap<>();

	    @Autowired
	    private JavaMailSender mailSender;

	    public void generateAndSendOtp(String email) {
	        String otp = String.format("%06d", new Random().nextInt(999999));
	        otpStorage.put(email, otp);

	        SimpleMailMessage message = new SimpleMailMessage();
	        message.setTo(email);
	        message.setSubject("OTP for Password Reset");
	        message.setText("Your OTP is: " + otp);

	        mailSender.send(message);
	    }

	    public boolean verifyOtp(String email, String otp) {
	        return otp.equals(otpStorage.get(email));
	    }
//    private final Map<String, String> otpStore = new ConcurrentHashMap<>();

//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private EmailService emailService;
//
//    public void sendOtpToEmail(String email) {
//        String otp = String.valueOf(new Random().nextInt(900000) + 100000); // 6-digit OTP
//        otpStore.put(email, otp);
//
//        String subject = "Reset Password OTP - Car Rental Service";
//        String message = "Your OTP for password reset is: " + otp;
//
//        emailService.sendEmail(email, subject, message);
//    }
//
//    public boolean verifyOtpAndResetPassword(String email, String newPassword, String otp) {
//        String storedOtp = otpStore.get(email);
//        if (storedOtp != null && storedOtp.equals(otp)) {
//            Optional<User> optionalUser = userRepository.findByEmail(email);
//            if (optionalUser.isPresent()) {
//                User user = optionalUser.get();
//                user.setPassword(newPassword); // ⚠️ Password should be encoded in real applications
//                userRepository.save(user);
//                otpStore.remove(email); // Invalidate OTP
//                return true;
//            }
//        }
//        return false;
//    }

}
