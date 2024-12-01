import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = ({ selectedDates, onDateClick }) => {
  return (
    <Calendar
      tileClassName={({ date }) =>
        selectedDates.includes(date.toISOString().split('T')[0]) ? 'highlight' : ''
      }
      onClickDay={(date) => onDateClick(date)} 
    />
  );
};

export default CalendarComponent;
