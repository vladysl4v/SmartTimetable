import {getAccusativeDayOfWeek, shortDate} from "../../utils/DateUtilities.js";
import {MainContainer} from "../../layout/MainContainer/MainContainer.jsx";
import {DateNavigator} from "../../components/DateNavigator/DateNavigator.jsx";
import {ScheduleModal} from "../../components/ScheduleModal/ScheduleModal.jsx";
import {ScheduleTable} from "../../components/ScheduleTable/ScheduleTable.jsx";
import {useIsMobile} from "../../hooks/useIsMobile.js";
import {useMsal} from "@azure/msal-react";
import {Spinner} from "react-bootstrap";
import {useState} from "react";
import './TeacherSchedule.css'
import {useLocalStorage} from "../../hooks/useLocalStorage.js";
import {Hint} from "../../layout/Hint/Hint.jsx";
import {useTeacherSchedule} from "../../hooks/useTeacherSchedule.js";

const TeacherSchedule = () => {
    const {instance, accounts} = useMsal()
    const [schedule, isLoading, date, setDate] = useTeacherSchedule(instance, accounts)
    const [selectedLesson, selectLesson] = useState(null)
    const [localStorage] = useLocalStorage();
    const isMobile = useIsMobile()
    
    return (
        <>
            <DateNavigator currentDate={date} setCurrentDate={setDate} identifier={localStorage.teacherId?.value} type='teacher' />
            <MainContainer>
                <h3 className='text-center text-light mb-4'>
                    Розклад викладача на {getAccusativeDayOfWeek(date)} {shortDate(date)}
                    {(isLoading) ? <Spinner animation='border' variant="light" className='position-absolute ms-2 mt-2' size='sm'/> : null}
                </h3>
                <ScheduleTable schedule={schedule} isMobile={isMobile} selectLesson={selectLesson} preferences={localStorage} type='teacher'/>
                {
                    (schedule?.length) ?
                        <Hint>
                            Клікніть по рядку, щоб дізнатись деталі заняття
                        </Hint> 
                    : null
                }
            </MainContainer>
            <ScheduleModal item={selectedLesson} close={() => selectLesson(null)} msalClient={instance} activeAccount={accounts[0]} type='teacher'/>
        </>
    );
};

export default TeacherSchedule;