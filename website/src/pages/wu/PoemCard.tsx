


import React from 'react';
import styles from './PoemCard.module.css';

interface Poem {
  province: string;
  cities: string[];
}

const PoemCard: React.FC<{ poem: Poem }> = ({ poem }) => {

  return (
    <div className={styles.card}>
      <div className={styles.seal}>📍</div>
      <h2>{poem.province}</h2>
      <div className={styles.paragraphs}>
        <p><strong>城市:</strong> {poem.cities.join(', ')}</p>
      </div>
    </div>
  );
};

export default PoemCard;
