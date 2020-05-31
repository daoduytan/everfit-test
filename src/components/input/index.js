import React, { memo } from 'react';
import styles from './input.module.css';

const Input = memo((props) => {
  return <input {...props} className={styles.input} />;
});

const TextArea = memo((props) => {
  return <textarea {...props} className={styles.input} />;
});

export { Input, TextArea };
