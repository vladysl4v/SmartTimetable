import {getAccusativeDayOfWeek, shortDate} from "../../utils/DateUtilities.js";
import {MainContainer} from "../../layout/MainContainer/MainContainer.jsx";
import {DateNavigator} from "../../components/DateNavigator/DateNavigator.jsx";
import {ScheduleModal} from "../../components/ScheduleModal/ScheduleModal.jsx";
import {ScheduleTable} from "../../components/ScheduleTable/ScheduleTable.jsx";
import {useIsMobile} from "../../hooks/useIsMobile.js";
import {useSchedule} from "../../hooks/useSchedule.js";
import {useMsal} from "@azure/msal-react";
import {Spinner} from "react-bootstrap";
import {useState} from "react";
import './Schedule.css'
import {useLocalStorage} from "../../hooks/useLocalStorage.js";
import {Hint} from "../../layout/Hint/Hint.jsx";

const Schedule = () => {
    const {instance, accounts} = useMsal()
    const [schedule, isLoading, date, setDate] = useSchedule(instance, accounts)
    const [selectedLesson, selectLesson] = useState(null)
    const [localStorage] = useLocalStorage();
    const isMobile = useIsMobile()
    
    return (
        <>
            <DateNavigator currentDate={date} setCurrentDate={setDate}  />
            <MainContainer>
                <h3 className='text-center text-light mb-4'>
                    Розклад занять на {getAccusativeDayOfWeek(date)} {shortDate(date)}
                    {(isLoading) ? <Spinner animation='border' variant="light" className='position-absolute ms-2 mt-2' size='sm'/> : null}
                </h3>
                <ScheduleTable schedule={schedule} isMobile={isMobile} selectLesson={selectLesson} selectedGroup={localStorage.studyGroup}/>
                <Hint>
                    Клікніть по рядку, щоб дізнатись деталі заняття
                </Hint>
            </MainContainer>
            <ScheduleModal item={selectedLesson} close={() => selectLesson(null)} msalClient={instance}/>
        </>
    );
};

export default Schedule;