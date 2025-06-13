import React from "react";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CarDetails.css';

const mockCars = [
  {
    id: 1,
    model: 'Toyota Camry',
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    pricePerDay: 2500,
    description: 'Whether navigating bustling urban streets or setting off on an adventure, this car seamlessly blends luxury with advanced technology to redefine modern driving.',
    imageUrl: 'https://placehold.co/600x400'
  },
  {
    id: 2,
    model: 'Honda Accord',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    pricePerDay: 1700,
    description: 'Reliable, stylish and efficient — the perfect rental sedan.',
    imageUrl: 'https://placehold.co/600x400'
  },
  {
    id: 3,
    model: 'Tesla Model 3',
    transmission: 'Automatic',
    fuelType: 'Electric',
    pricePerDay: 3200,
    description: 'Electric power, cutting-edge tech and great range.',
    imageUrl: 'https://placehold.co/600x400'
  }
];


function CarDetails(){
     const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const foundCar = mockCars.find(c => c.id === parseInt(carId));
    setCar(foundCar);
  }, [carId]);

  const handleBooking = () => {
    alert(`Car booked from ${startDate} to ${endDate}`);
  };

  if (!car) return <div>Loading...</div>;

  return (
    <div className="car-details-page">
      <h1>{car.model}</h1>
      <div className="car-content-wrapper">
      <img src={car.imageUrl} alt={car.model} className="car-image" />
      
    <div className="car-info-table">
      <div className="carfeatures">
      <p><strong>Transmission:</strong> {car.transmission}</p>
      <p><strong>Fuel Type:</strong> {car.fuelType}</p>
      <p><strong>Price Per Day:</strong> ₹ {car.pricePerDay} /-</p>
      <b className="desc">Description </b>
      <p className="description">{car.description} </p>
      </div>
      
      </div>
      
    </div >
      <div className="date-picker">
        <label>Start Date: </label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        <label>End Date: </label>
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      </div>

      <button className="book-now-button" onClick={handleBooking}>Book Now</button>
    </div>
  );

    

}

export default CarDetails;