import React, { useState } from 'react';
import styles from './styles/AddSauceForm.module.css';
import apiURL from '../api';

export const AddSauceForm = ({ onSauceAdded }) => {
  const [sauce, setSauce] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSauce({ ...sauce, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${apiURL}/sauces`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sauce)
    })
      .then(response => response.json())
      .then(data => {
        onSauceAdded();
        setSauce({ name: '', description: '', price: '', category: '', image: '' });
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Add New Sauce</h1>
      <input name="name" value={sauce.name} onChange={handleChange} placeholder="Name" required />
      <input name="description" value={sauce.description} onChange={handleChange} placeholder="Description" required />
      <input name="price" value={sauce.price} onChange={handleChange} placeholder="Price" required />
      <input name="category" value={sauce.category} onChange={handleChange} placeholder="Category" required />
      <input name="image" value={sauce.image} onChange={handleChange} placeholder="Image URL" required />
      <button type="submit">Add Sauce</button>
    </form>
  );
};
