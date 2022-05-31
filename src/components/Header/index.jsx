import * as React from 'react';
import logo from './Logo.svg';
import styles from './Header.module.css';
import hamburger from './Hamburger.svg';
import { getInitialsFromName } from '../../utils';

export function Header({ isLeftNavOpen = true, name = 'John Doe' }) {
  return (
    <div className={styles.container}>
      <div
        className={
          isLeftNavOpen ? styles.logoContainerOpen : styles.logoContainer
        }
      >
        <img src={logo} className={styles.logo} alt="logo" />
        <img src={hamburger} className={styles.hamburger} alt="hamburger" />
      </div>
      <div className={styles.profile}>
        <div className={styles.avatar}>
          <span>{getInitialsFromName(name)}</span>
        </div>
        <span className={styles.name}>{name}</span>
      </div>
    </div>
  );
}
