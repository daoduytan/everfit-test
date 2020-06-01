import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './button.module.css';

const Button = ({ type, size, block, ...props }) => {
  const classType = type === 'primary' ? styles.primary : '';

  const classSize = size === 'large' ? styles.large : '';

  const classButton = `${styles.button} ${classType} ${classSize}`;

  const style = {
    display: block ? 'block' : 'inline-block',
    width: block ? '100%' : 'inherit',
  };

  return <button {...props} className={classButton} style={{ ...style }} />;
};

Button.propTypes = {
  type: PropTypes.string,
  block: PropTypes.bool,
  size: PropTypes.string,
};

Button.defaultProps = {
  size: 'default',
  block: false,
};

export default memo(Button);
