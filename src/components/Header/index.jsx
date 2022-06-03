import * as React from 'react';
import logo from './Logo.svg';
import styles from './Header.module.css';
import hamburger from './Hamburger.svg';
import { getInitialsFromName } from '../../utils';
import { USER_URL } from '../../contants';

export function Header({ isLeftNavOpen = true }) {
  const [name, setName] = React.useState({ firstName: '', lastName: '' });
  const { firstName, lastName } = name;
  React.useEffect(() => {
    async function getUser() {
      const res = await fetch(USER_URL);
      const json = await res.json();
      const user = json.data[0];
      setName({ firstName: user.firstName, lastName: user.lastName });
    }
    getUser();
  }, []);

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
          <span>{getInitialsFromName(firstName, lastName)}</span>
        </div>
        <span className={styles.name}>{`${firstName} ${lastName}`}</span>
      </div>
    </div>
  );
}
