//package com.rentalcar.config;
//
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//
//import com.rentalcar.Entity.User;
//import com.rentalcar.repository.UserRepository;
//
//import lombok.RequiredArgsConstructor;
//
//@Component
//@RequiredArgsConstructor
//public class AdminCredentials implements CommandLineRunner {
//
//    private final UserRepository userRepo;
//    private final PasswordEncoder passwordEncoder;
//
//    @Override
//    public void run(String... args) {
//        userRepo.findByEmail("venkysvt2000@gmail.com").ifPresentOrElse(
//            user -> System.out.println("Admin already exists."),
//            () -> {
//                User admin = new User();
//                admin.setName("Venkat");
//                admin.setEmail("venkysvt2000@gmail.com");
//                admin.setPassword(passwordEncoder.encode("admin")); // Use environment variable in production
//                admin.setRole("ADMIN");
//                userRepo.save(admin);
//                System.out.println("Admin user created.");
//            }
//        );
//    }
//}
