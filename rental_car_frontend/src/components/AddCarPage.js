import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddCarPage.css';

function AddCarPage() {
  const navigate = useNavigate();

  const [carData, setCarData] = useState({
    brand: '',
    fuelType: 'Petrol',
    transmission: '',
    pricePerDay: '',
    description: '',
    imageFile: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setCarData({ ...carData, imageFile: file });
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setCarData({ ...carData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('brand', carData.brand);
      formData.append('fuelType', carData.fuelType);
      formData.append('transmission', carData.transmission);
      formData.append('pricePerDay', carData.pricePerDay);
      formData.append('description', carData.description);
      formData.append('image', carData.imageFile); 

      await axios.post('http://localhost:8080/api/cars/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert("Car added successfully!");
      navigate("/HomepageAdmin");

    } catch (error) {
      console.error("Error adding car:", error);
      alert("Failed to add car.");
    }
  };

  return (
    <div className="add-car-container">
      <h2>Add New Car</h2>
      <form className="car-form" onSubmit={handleSubmit}>
        <label>Choose Car Image:</label>
        <input type="file" name="image" accept="image/*" onChange={handleChange} required />

        {previewImage && <img src={previewImage} alt="Preview" className="preview-img" />}

        <label>Brand / Model:</label>
        <input type="text" name="brand" value={carData.brand} onChange={handleChange} required />

        <label>Fuel Type:</label>
        <select name="fuelType" value={carData.fuelType} onChange={handleChange}>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Electric">Electric</option>
        </select>

        <label>Transmission:</label>
        <input type="text" name="transmission" value={carData.transmission} onChange={handleChange} required />

        <label>Price Per Day:</label>
        <input type="number" name="pricePerDay" value={carData.pricePerDay} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={carData.description} onChange={handleChange} required />

        <button type="submit" className="add-button">Add New Car</button>
      </form>
    </div>
  );
}

export default AddCarPage;
