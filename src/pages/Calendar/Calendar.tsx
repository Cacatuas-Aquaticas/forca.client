// pages/Calendar/Calendar.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, addMonths, subMonths, isBefore, isAfter } from 'date-fns';
import styles from './Calendar.module.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  const startDate = new Date(2024, 11, 25); // 25/12/2024
  const today = new Date();

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handleDayClick = (day: number) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    if (isBefore(selectedDate, startDate) || isAfter(selectedDate, today)) return;
    navigate(`/play/${format(selectedDate, 'yyyy-MM-dd')}`);
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const getDayState = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateKey = format(date, 'yyyy-MM-dd');
    const gameState = localStorage.getItem(`game-${dateKey}`);

    if (gameState === 'win') return 'green';
    if (gameState === 'lose') return 'red';
    if (gameState === 'inProgress') return 'yellow';
    return 'default';
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button onClick={handlePreviousMonth}>Anterior</button>
        <span>{format(currentDate, 'MMMM yyyy')}</span>
        <button onClick={handleNextMonth}>Próximo</button>
      </div>
      <div className={styles.daysOfWeek}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className={styles.days}>
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className={styles.empty}></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          const isDisabled = isBefore(date, startDate) || isAfter(date, today);
          const dayState = getDayState(day);

          return (
            <div
              key={day}
              className={`${styles.day} ${isDisabled ? styles.disabled : ''} ${styles[dayState]}`}
              onClick={() => !isDisabled && handleDayClick(day)}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;