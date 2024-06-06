import React, { useState, useEffect } from 'react';
import styles from './styles/SauceDetail.module.css';
import apiURL from '../api';

export const SauceDetail = ({ sauceId, onBack, onDelete, onEdit, onSauceUpdated }) => {
  const [sauce, setSauce] = useState(null);
  const [editedSauce, setEditedSauce] = useState(null);

  useEffect(() => {
    fetch(`${apiURL}/sauces/${sauceId}`)
      .then(response => response.json())
      .then(data => {
        setSauce(data);
        setEditedSauce(data);
      });
  }, [sauceId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSauce({ ...editedSauce, [name]: value });
  };

  const handleClick = () => {
    const message = "Are you sure you want to delete this sauce?";
    const isConfirmed = window.confirm(message);
    if (!isConfirmed) return;

    fetch(`${apiURL}/sauces/${sauceId}`, {
      method: 'DELETE',
    }).then(response => {
      if (!response.ok) return;
      onDelete();
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${apiURL}/sauces/${sauceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedSauce)
    })
      .then(response => response.json())
      .then(data => {
        onSauceUpdated();
      });
  };

  if (!sauce) return <div>Loading...</div>;

  return (
    <div className={styles.detailContainer}>
      <button onClick={onBack}>Back</button>
      <button onClick={handleClick}>Delete</button>
      <button onClick={onEdit}>Edit</button>
      <h1>{sauce.name}</h1>
      <p>{sauce.description}</p>
      <p>Category: {sauce.category}</p>
      <p>Price: ${sauce.price}</p>
      <img className={styles.detailImage} src={sauce.image} alt={sauce.name} />

      {/* Edit form */}
      <form className={styles.editForm} onSubmit={handleSubmit}>
        <h2>Edit Sauce</h2>
        <input name="name" value={editedSauce.name} onChange={handleChange} placeholder="Name" required />
        <input name="description" value={editedSauce.description} onChange={handleChange} placeholder="Description" required />
        <input name="price" value={editedSauce.price} onChange={handleChange} placeholder="Price" required />
        <input name="category" value={editedSauce.category} onChange={handleChange} placeholder="Category" required />
        <input name="image" value={editedSauce.image} onChange={handleChange} placeholder="Image URL" required />
        <button type="submit">Update Sauce</button>
      </form>
    </div>
  );
};
