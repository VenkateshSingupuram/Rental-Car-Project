package com.rentalcar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
//@EnableJpaRepositories(basePackages = "com.rentalcar.repository")  // 👈 this is important
public class CarRentalBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(CarRentalBackendApplication.class, args);
    }
}
