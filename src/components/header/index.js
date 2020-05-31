import React, { memo } from 'react';

import styles from './header.module.css';

const Header = () => {
  return <div className={styles.header}>Manage working training</div>;
};

export default memo(Header);
