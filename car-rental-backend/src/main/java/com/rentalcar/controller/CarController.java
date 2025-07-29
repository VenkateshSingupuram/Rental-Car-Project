package com.rentalcar.controller;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.rentalcar.Entity.Car;
import com.rentalcar.repository.CarRepository;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "http://localhost:3000")
public class CarController {

    @Autowired
    private CarRepository carRepository;

    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping("/add")
    public ResponseEntity<?> addCar(@RequestParam("brand") String brand,
                                    @RequestParam("fuelType") String fuelType,
                                    @RequestParam("transmission") String transmission,
                                    @RequestParam("pricePerDay") double pricePerDay,
                                    @RequestParam("description") String description,
                                    @RequestParam("image") MultipartFile imageFile) {

        try {
            // Save image
            String fileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
            Path path = Paths.get("uploads", fileName);
            Files.write(path, imageFile.getBytes());

          
            Car car = new Car();
            car.setBrand(brand);
            car.setFuelType(fuelType);
            car.setTransmission(transmission);
            car.setPricePerDay(pricePerDay);
            car.setDescription(description);

           car.setImagePath("uploads/" + fileName);  // This field should exist in your Car entity

            carRepository.save(car);
            return ResponseEntity.ok("Car added successfully!");

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving car");
        }
    }



    @GetMapping("/carRetrieve")
    public ResponseEntity<List<Car>> getAllCars() {
        List<Car> cars = carRepository.findAll();
        return ResponseEntity.ok(cars);
    }
}

