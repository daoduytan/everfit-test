import React, { memo } from 'react';
import styles from './icon.module.css';

// Plus
const Plus = memo(({ color }) => {
  const styleColor = { background: color || '#fff' };
  return (
    <span className={styles.plus}>
      <i style={styleColor} />
      <i style={styleColor} />
    </span>
  );
});

// Dot
const Dot = memo(({ color }) => {
  const styleColor = { background: color || '#fff' };
  return (
    <span className={styles.dots}>
      <i style={styleColor} />
      <i style={styleColor} />
      <i style={styleColor} />
    </span>
  );
});

export { Plus, Dot };
