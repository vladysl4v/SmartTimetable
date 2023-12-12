import './DateNavigator.css'
import {CalendarButton} from "../CalendarButton/CalendarButton.jsx";
import {shortDate, getNextDay, getPreviousDay, getDayOfWeek} from "../../utils/DateUtilities.js";
import {useState} from "react";

export const DateNavigator = ({currentDate, setCurrentDate}) => {
  const generateDescription = (date) => {
    return getDayOfWeek(date) + ' ' + shortDate(date)
  }
    const [actualDate] = useState(new Date())
  
    return (
        <div className="d-flex justify-content-center gap-3 flex-wrap align-items-center local-container">
          <CalendarButton description={generateDescription(actualDate)} action={() => setCurrentDate(actualDate)}>
            На сьогодні
          </CalendarButton>
          <CalendarButton description={generateDescription(getNextDay(actualDate))} action={() => setCurrentDate(getNextDay(actualDate))}>
            На завтра
          </CalendarButton>
          <CalendarButton description='Минулий день' action={() => setCurrentDate(getPreviousDay(currentDate))}>
              <i className="fa-solid fa-caret-left"></i> Назад
          </CalendarButton>
          <CalendarButton description='Наступний день' action={() => setCurrentDate(getNextDay(currentDate))}>
            Вперед <i className="fa-solid fa-caret-right"></i>
          </CalendarButton>
          <CalendarButton description='Розклад на обраний день' action={(args) => setCurrentDate(args.target.valueAsDate)} type='date'/>
        </div>
    )
}