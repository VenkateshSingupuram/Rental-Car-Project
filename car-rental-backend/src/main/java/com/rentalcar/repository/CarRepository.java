package com.rentalcar.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rentalcar.Entity.Car;

public interface CarRepository extends JpaRepository<Car, Long> {
}