//package com.rentalcar.service;
//
//import java.util.List;
//import java.util.Optional;
//
//import org.springframework.stereotype.Service;
//
//import com.rentalcar.Entity.Car;
//import com.rentalcar.repository.CarRepository;
//
//import lombok.RequiredArgsConstructor;
//
//@Service
//@RequiredArgsConstructor
//public class CarService {
//
//    private final CarRepository carRepo;
//
//    public List<Car> getAllCars() {
//        return carRepo.findAll();
//    }
//
//    public Optional<Car> getCarById(Long id) {
//        return carRepo.findById(id);
//    }
//
//    public Car addCar(Car car) {
//        return carRepo.save(car);
//    }
//
//    public Car updateCar(Long id, Car updatedCar) {
//        Car existing = carRepo.findById(id)
//            .orElseThrow(() -> new RuntimeException("Car not found"));
//
//        existing.setModelName(updatedCar.getModelName());
//        existing.setTransmission(updatedCar.getTransmission());
//        existing.setFuelType(updatedCar.getFuelType());
//        existing.setPricePer24h(updatedCar.getPricePer24h());
//        existing.setImageUrl(updatedCar.getImageUrl());
//
//        return carRepo.save(existing);
//    }
//
//    public void deleteCar(Long id) {
//        carRepo.deleteById(id);
//    }
//
//}
