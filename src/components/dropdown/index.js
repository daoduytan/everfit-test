import React, { memo } from 'react';
import styles from './dropdown.module.css';

const Dropdown = ({ menu, title }) => {
  return (
    <div className={styles.dropdown}>
      {title}
      <div className={styles.dropdown_menu}>{menu}</div>
    </div>
  );
};

export default memo(Dropdown);
