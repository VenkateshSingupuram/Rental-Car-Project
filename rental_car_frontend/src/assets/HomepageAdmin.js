import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomepageAdmin.css";
import axios from "axios";

function HomepageAdmin() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCar, setEditingCar] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    imageUrl: "",
    model: "",
    fuelType: "",
    transmission: "",
    pricePerDay: "",
    description: ""
  });

 useEffect(() => {
  axios.get("http://localhost:8080/api/cars/carRetrieve")
    .then(res => {
      const backendCars = res.data.map(car => ({
        ...car,
    imageUrl: `http://localhost:8080/${car.imagePath}`
      }));
      setCars(backendCars);
    })
    .catch(err => {
      console.error("Error fetching cars:", err);
    })
    .finally(() => {
      setLoading(false);
    });
}, []);


  const handleEditClick = (car) => {
    setEditingCar(car);
    setUpdatedData({
      imageUrl: car.imageUrl,
      model: car.model,
      fuelType: car.fuelType,
      transmission: car.transmission,
      pricePerDay: car.pricePerDay,
      description: car.description
    });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const imageUrl = URL.createObjectURL(files[0]);
      setUpdatedData({ ...updatedData, imageUrl });
    } else {
      setUpdatedData({ ...updatedData, [name]: value });
    }
  };

  const handleUpdate = () => {
    const updatedCars = cars.map(car =>
      car.id === editingCar.id ? { ...editingCar, ...updatedData } : car
    );
    setCars(updatedCars);
    setEditingCar(null);
  };

  const handleDelete = (id) => {
    const filtered = cars.filter(car => car.id !== id);
    setCars(filtered);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">DriveEase</div>
        <div className="nav-links">
          <Link to="">Dashboard</Link>
            <Link to="/add-car">Add Cars</Link>
          <Link to="/bookings">Bookings</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/new">New</Link>
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
                
               <img src={car.imageUrl} alt={car.brand} className="car-image"/>


              </div>
              <div className="car-details">
                <h2 className="car-model">Model: {car.model}</h2>
                <div className="car-specs">
                  <span className="car-spec">{car.transmission}</span>
                  <span className="car-spec">{car.fuelType}</span>
                </div>
                <div className="car-price">
                  <div className="price-per-day">
                    ${car.pricePerDay}/<span style={{ fontSize: '14px' }}>day</span>
                  </div>
                </div>
                <p style={{ marginTop: "10px" }}>{car.description}</p>
                <div className="button-group">
                  <button className="rent-button" onClick={() => handleEditClick(car)}>Update</button>
                  <button className="delete-button" onClick={() => handleDelete(car.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingCar && (
        <div className="modal">
          <div className="modal-content">
            <h2>Update Car Info</h2>
            <input type="file" name="image" accept="image/*" onChange={handleInputChange} />
            <input type="text" name="model" value={updatedData.model} onChange={handleInputChange} placeholder="Brand/Model" />
            <select name="fuelType" value={updatedData.fuelType} onChange={handleInputChange}>
              <option>Hybrid</option>
              <option>Petrol</option>
              <option>Diesel</option>
              <option>Electric</option>
              <option>CNG</option>
            </select>
            <input type="text" name="transmission" value={updatedData.transmission} onChange={handleInputChange} placeholder="Transmission" />
            <input type="number" name="pricePerDay" value={updatedData.pricePerDay} onChange={handleInputChange} placeholder="Price Per Day" />
            <textarea name="description" value={updatedData.description} onChange={handleInputChange} placeholder="Description"></textarea>
            <button className="rent-button" onClick={handleUpdate}>Save Changes</button>
            <button className="delete-button" onClick={() => setEditingCar(null)}>Cancel</button>
          </div>
        </div>
      )}

      <footer className="footer">
        &copy; 2023 DriveEase Car Rental. All rights reserved.
      </footer>
    </div>
  );
}

export default HomepageAdmin;
