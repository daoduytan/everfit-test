import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './dropdown.module.css';

const Dropdown = ({ menu, title }) => {
  return (
    <div className={styles.dropdown}>
      {title}
      <div className={styles.dropdown_menu}>{menu}</div>
    </div>
  );
};

Dropdown.propTypes = {
  menu: PropTypes.element,
  title: PropTypes.element,
};

export default memo(Dropdown);
