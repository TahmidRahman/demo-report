import * as React from 'react';
import { Charts, Modules, Dashboard, Reports, Logout } from './icons';
import styles from './LeftNavigation.module.css';

const items = [
  {
    id: 'charts',
    icon: Charts,
    label: 'Charts'
  },
  {
    id: 'modules',
    icon: Modules,
    label: 'Modules'
  },
  {
    id: 'dashboard',
    icon: Dashboard,
    label: 'Dashboard'
  },
  {
    id: 'reports',
    icon: Reports,
    label: 'Reports'
  },
  {
    id: 'logout',
    icon: Logout,
    label: 'Logout'
  }
];

export function LeftNavigation() {
  return (
    <div className={styles.container}>
      {items.map((item) => (
        <img src={item.icon} key={item.id} alt={item.id} />
      ))}
    </div>
  );
}
