package com.rentalcar.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.rentalcar.model.Booking;
import com.rentalcar.repository.BookingRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepo;

    public Booking createBooking(Booking booking) {
        return bookingRepo.save(booking);
    }

    public List<Booking> getUserBookings(Long userId) {
        return bookingRepo.findByUserId(userId);
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepo.findById(id);
    }

    public void deleteBooking(Long id) {
        bookingRepo.deleteById(id);
    }
}
