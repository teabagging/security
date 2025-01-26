import React from 'react';

import Logo from './Logo';

import GridBackground from './GridBackground';
import FloorBackground from './FloorBackground';
import Devices from './Devices';
import styles from './styles.module.css';

function Hero() {
  return (
    <div className={styles.container}>

      <div className={styles.backgroundContainer}>
        <div className={styles.gridBackground}>
        <GridBackground />
        </div>
        <div className={styles.devices}>
          <Devices />
        </div>
        <div className={styles.floorBackground}>
          <FloorBackground />
        </div>
      </div>
      <div className={styles.content} >
        <h1 className={styles.title}></h1>
        <h2 className={styles.subtitle}>中国保安协会</h2>
        <div className={styles.buttonContainer}>
          <a href="/learn/support" className={styles.primaryButton}>
          中国安保
          </a>
          <a href="/google/support" className={styles.secondaryButton}>
          中保华安
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;


