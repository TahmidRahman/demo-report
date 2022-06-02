import styles from './ContentHeader.module.css';
import { Dropdown } from '../Dropdown';

const dropdownOptions = {
  gateway: [{ label: 'All gateways', value: '' }],
  project: [{ label: 'All projects', value: '' }]
};
export function ContentHeader({ title, subtitle, filter }) {
  return (
    <div className={styles.container}>
      <div className={styles.subject}>
        <span className={styles.title}>{title}</span>
        <span className={styles.subtitle}>{subtitle}</span>
      </div>
      <div className={styles.filter}>
        <Dropdown value={filter.gateway} options={dropdownOptions.gateway} />
        <Dropdown value={filter.project} options={dropdownOptions.project} />
      </div>
    </div>
  );
}
