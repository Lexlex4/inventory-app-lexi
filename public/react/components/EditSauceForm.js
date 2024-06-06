import React, { useEffect, useState } from 'react';
import styles from './styles/EditSauceForm.module.css';
import apiURL from '../api';

export const EditSauceForm = ({ sauceId, onSauceUpdated }) => {
  const [sauce, setSauce] = useState(null);

  useEffect(() => {
    fetch(`${apiURL}/sauces/${sauceId}`)
      .then(response => response.json())
      .then(data => setSauce(data));
  }, [sauceId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSauce({ ...sauce, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${apiURL}/sauces/${sauceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sauce)
    })
      .then(response => response.json())
      .then(data => {
        onSauceUpdated();
      });
  };

  if (!sauce) return <div>Loading...</div>;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Edit Sauce</h1>
      <input name="name" value={sauce.name} onChange={handleChange} placeholder="Name" required />
      <input name="description" value={sauce.description} onChange={handleChange} placeholder="Description" required />
      <input name="price" value={sauce.price} onChange={handleChange} placeholder="Price" required />
      <input name="category" value={sauce.category} onChange={handleChange} placeholder="Category" required />
      <input name="image" value={sauce.image} onChange={handleChange} placeholder="Image URL" required />
      <button type="submit">Update Sauce</button>
    </form>
  );
};
