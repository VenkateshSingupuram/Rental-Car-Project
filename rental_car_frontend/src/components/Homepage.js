
import React from "react";
import { useState,useEffect } from "react";
import "./Homepage.css";
import { Link } from "react-router-dom";

function Homepage(){

        // const App = () => {
            const [cars, setCars] = useState([]);
            const [loading, setLoading] = useState(true);

            useEffect(() => {
                // Simulate API call
                setTimeout(() => {
                    const mockCars = [
                        {
                            id: 1,
                            model: "Toyota Camry",
                            transmission: "Automatic",
                            fuelType: "Hybrid",
                            pricePerDay: 75,
                            imageUrl: "https://placehold.co/600x400"
                        },
                        {
                            id: 2,
                            model: "Honda Accord",
                            transmission: "Automatic",
                            fuelType: "Gasoline",
                            pricePerDay: 80,
                            imageUrl: "https://placehold.co/600x400"
                        },
                        {
                            id: 3,
                            model: "Tesla Model 3",
                            transmission: "Automatic",
                            fuelType: "Electric",
                            pricePerDay: 120,
                            imageUrl: "https://placehold.co/600x400"
                        }
                    ];
                    setCars(mockCars);
                    setLoading(false);
                }, 1000);
            }, []);

            return (
                <div>
                    <nav className="navbar">
                        <div className="logo">DriveEase</div>
                      <div className="nav-links">
                        <Link to="/home">Home</Link>
                        {/* <Link to="/cars">Cars</Link>
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link> */}
                        </div>
                    </nav>

                    <h1 className="page-title">Our Featured Cars</h1>

                    {loading ? (
                        <div style={{ textAlign: 'center', margin: '50px' }}>
                            Loading cars...
                        </div>
                    ) : (
                        <div className="cars-container">
                            {cars.map(car => (
                                <div key={car.id} className="car-card">
                                    <div className="car-image-container">
                                        <img 
                                            src={car.imageUrl} 
                                            alt={`${car.model} parked on a clean modern street`} 
                                            className="car-image"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://placehold.co/600x400?text=Car+Image";
                                            }}
                                        />
                                    </div>
                                    <div className="car-details">
                                        <h2 className="car-model">Modle:{car.model}</h2>
                                        <div className="car-specs">
                                            <span className="car-spec">{car.transmission}</span>
                                            <span className="car-spec">{car.fuelType}</span>
                                        </div>
                                        <div className="car-price">
                                            <div className="price-per-day">
                                                ${car.pricePerDay}<span style={{ fontSize: '14px', color: '#6c757d' }}>/day</span>
                                            </div>
                                          <Link to="/details/{1}">  <button className="rent-button">Rent Now</button></Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <footer className="footer">
                        &copy; 2023 DriveEase Car Rental. All rights reserved.
                    </footer>
                </div>
            );
    


}

export default Homepage;