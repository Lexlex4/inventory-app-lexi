import React from 'react';
import { Sauce } from './Sauce';

export const SaucesList = ({ sauces, onSauceSelect, onViewChange }) => {
  return (
    <>
      {sauces.map((sauce, idx) => (
        <div key={idx} onClick={() => { onSauceSelect(sauce.id); onViewChange('detail'); }}>
          <Sauce sauce={sauce} />
        </div>
      ))}
    </>
  );
};
