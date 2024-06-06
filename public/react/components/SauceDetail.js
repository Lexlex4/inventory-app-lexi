import React, { useEffect, useState } from 'react';
import styles from './styles/SauceDetail.module.css';
import apiURL from '../api';

export const SauceDetail = ({ sauceId, onBack, onDelete, onEdit }) => {
  const [sauce, setSauce] = useState(null);

  useEffect(() => {
    fetch(`${apiURL}/sauces/${sauceId}`)
      .then(response => response.json())
      .then(data => setSauce(data));
  }, [sauceId]);

  const handleDelete = () => {
    fetch(`${apiURL}/sauces/${sauceId}`, {
      method: 'DELETE',
    })
      .then(() => onDelete())
      .catch(error => console.error('Error deleting sauce:', error));
  };

  if (!sauce) return <div>Loading...</div>;

  return (
    <div className={styles.detailContainer}>
      <button onClick={onBack}>Back</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={onEdit}>Edit</button>
      <h1>{sauce.name}</h1>
      <p>{sauce.description}</p>
      <p>Category: {sauce.category}</p>
      <p>Price: ${sauce.price}</p>
      <img className={styles.detailImage} src={sauce.image} alt={sauce.name} />
    </div>
  );
};
