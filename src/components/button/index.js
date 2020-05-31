import React, { memo } from 'react';
import styles from './button.module.css';

const Button = ({ type, block, ...props }) => {
  const className =
    type === 'primary' ? `${styles.button} ${styles.primary}` : styles.button;

  const style = {
    display: block ? 'block' : 'inline-block',
    width: block ? '100%' : 'inherit',
  };

  return <button {...props} className={className} style={{ ...style }} />;
};

export default memo(Button);
