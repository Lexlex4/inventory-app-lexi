import React from 'react';
import styles from './styles/Sauce.module.css';

export const Sauce = (props) => {
  return (
    <>
      <h3 className={styles.sauceTitle}>{props.sauce.name}</h3>
      <img className={styles.sauceImage} src={props.sauce.image} alt={props.sauce.name} />
    </>
  );
};
