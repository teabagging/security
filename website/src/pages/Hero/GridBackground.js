/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import styles from './styles.module.css';

function GridBackground() {
  return (
    <div
      style={{
        width: '100%', // Full width
        height: '600px', // Set a height for the banner
        backgroundImage: 'url("./img/baotou.png")', // The image you want to use
        backgroundSize: 'cover', // Ensure the image covers the div
        backgroundPosition: 'center', // Center the image
        backgroundRepeat: 'no-repeat', // Avoid repeating the image
      }}
    />
  );
}

export default GridBackground;
