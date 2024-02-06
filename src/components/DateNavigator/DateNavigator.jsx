import './DateNavigator.css'
import {CalendarButton} from "../CalendarButton/CalendarButton.jsx";
import {shortDate, getNextDay, getPreviousDay, getDayOfWeek} from "../../utils/DateUtilities.js";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export const DateNavigator = ({currentDate, setCurrentDate, identifier, type}) => {
    const [actualDate] = useState(new Date())
    const navigate = useNavigate();

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
          <CalendarButton description='Розклад на обраний день' variant='outline-light' action={(args) => setCurrentDate(args.target.valueAsDate)} type='date'/>
            <CalendarButton description={'Зміна ' + (type === 'teacher') ? 'викладача' : 'навчальної групи'} variant='outline-light' action={() => navigate('/settings')}>
                {generateGroupOrTeacher(identifier, type)} <i className="fa-solid fa-cog"></i>
            </CalendarButton>
        </div>
    )
}
const generateDescription = (date) => {
    return getDayOfWeek(date) + ' ' + shortDate(date)
}

const generateGroupOrTeacher = (identifier, type) => {
    if (!identifier) {
        return 'Вибір ' + (type === 'teacher' ? 'викладача' : 'групи');
    }
    let name = identifier;
    if (type === 'teacher') {
        name = name.split(" ")[0];
    }
    return name.slice(0,14);
}