import React, { useState, useEffect } from 'react';
import styles from './styles/App.module.css';
import { SaucesList } from './components/SaucesList';
import { SauceDetail } from './components/SauceDetail';
import { AddSauceForm } from './components/AddSauceForm';
import { EditSauceForm } from './components/EditSauceForm';

import apiURL from './api';'

export const App = () => {
  const [sauces, setSauces] = useState([]);
  const [selectedSauceId, setSelectedSauceId] = useState(null);
  const [view, setView] = useState('list'); // 'list', 'detail', 'add', 'edit'

  async function fetchSauces() {
    try {
      const response = await fetch(`${apiURL}/sauces`);
      const saucesData = await response.json();
      setSauces(saucesData);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }

  useEffect(() => {
    fetchSauces();
  }, []);

  const handleSauceAdded = () => {
    fetchSauces();
    setView('list');
  };

  const handleSauceDeleted = () => {
    fetchSauces();
    setView('list');
  };

  const handleSauceUpdated = () => {
    fetchSauces();
    setView('detail');
  };

  return (
    <main className={styles.main}>
      <h1>Sauce Store</h1>
      <h2>All things 🔥</h2>
      {view === 'list' && (
        <>
          <button onClick={() => setView('add')}>Add New Sauce</button>
          <SaucesList sauces={sauces} onSauceSelect={setSelectedSauceId} onViewChange={setView} />
        </>
      )}
      {view === 'detail' && (
        <SauceDetail
          sauceId={selectedSauceId}
          onBack={() => setView('list')}
          onDelete={handleSauceDeleted}
          onEdit={() => setView('edit')}
        />
      )}
      {view === 'add' && (
        <AddSauceForm onSauceAdded={handleSauceAdded} />
      )}
      {view === 'edit' && (
        <EditSauceForm sauceId={selectedSauceId} onSauceUpdated={handleSauceUpdated} />
      )}
    </main>
  );
};
