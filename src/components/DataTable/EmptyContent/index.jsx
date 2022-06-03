import styles from './EmptyContent.module.css';
import NoReportLogo from './NoReportLogo.svg';

export function EmptyContent() {
  return (
    <div className={styles.container}>
      <span className={styles.title}>No reports</span>
      <span className={styles.description}>
        Currently you have no data for the reports to be generated. Once you
        start generating traffic through the Balance application the reports
        will be shown.
      </span>
      <img src={NoReportLogo} alt="NoReportLogo" />
    </div>
  );
}
