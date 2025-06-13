//package com.rentalcar.service;
//
//import java.util.Map;
//import java.util.Optional;
//import java.util.Random;
//import java.util.concurrent.ConcurrentHashMap;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.rentalcar.Entity.User;
//import com.rentalcar.repository.UserRepository;
//
//@Service
//public class OtpService {
//
//    private final Map<String, String> otpStore = new ConcurrentHashMap<>();
//
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
//
//}
