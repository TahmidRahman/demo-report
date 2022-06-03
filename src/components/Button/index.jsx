import styles from './Button.module.css';

export function Button({ onClick, children, type, icon }) {
  return (
    <button className={`${styles.button} ${styles[type]}`} onClick={onClick}>
      <span>{children}</span>
      {icon || null}
    </button>
  );
}
