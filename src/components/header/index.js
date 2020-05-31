import React, { memo } from 'react';

import styles from './header.module.css';
import NavigationWeek from './navigation_week';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>Manage working training</div>

      <NavigationWeek />
    </div>
  );
};

export default memo(Header);
