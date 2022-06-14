import isValid from 'date-fns/isValid';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePicker.module.css';
import ReactDatePicker from 'react-datepicker';
import Calendar from './Calendar.svg';

const DEFAULT_DATE_FORMAT = 'dd.MM.yyyy';

export function DatePicker({ selected, onChange, placeholder, dateFormat }) {
  const selectedDate = isValid(new Date(selected)) ? new Date(selected) : null;

  return (
    <div className={styles.container}>
      <ReactDatePicker
        selected={selectedDate}
        onChange={onChange}
        placeholderText={placeholder}
        dateFormat={dateFormat || DEFAULT_DATE_FORMAT}
      />
      <img src={Calendar} alt="calendar" />
    </div>
  );
}
