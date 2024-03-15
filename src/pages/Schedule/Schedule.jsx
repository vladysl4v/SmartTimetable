import {getAccusativeDayOfWeek, shortDate} from "../../utils/Formatters.js";
import {MainContainer} from "../../layout/MainContainer/MainContainer.jsx";
import {DateNavigator} from "../../components/DateNavigator/DateNavigator.jsx";
import {ScheduleModal} from "../../components/ScheduleModal/ScheduleModal.jsx";
import {ScheduleTable} from "../../components/ScheduleTable/ScheduleTable.jsx";
import {Spinner} from "react-bootstrap";
import {useState} from "react";
import './Schedule.css'
import {Hint} from "../../layout/Hint/Hint.jsx";
import {useConfiguration} from "../../hooks/useConfiguration.js";
import {useSchedule} from "../../hooks/useSchedule.js";
import {GroupConfigurator} from "../../components/GroupConfigurator/GroupConfigurator.jsx";

const Schedule = ({type}) => {
    const config = useConfiguration();
    const [schedule, isLoading, date, setDate] = useSchedule(type, config);
    const [scheduleMode, setScheduleMode] = useState('schedule')
    const [selectedLesson, selectLesson] = useState(null);
    const identifier = type === 'student' ? config.localStorage.studyGroup?.value : config.localStorage.teacherId?.value;
    
    return (
        <>
            <DateNavigator currentDate={date} setCurrentDate={setDate} identifier={identifier} type={type} configureGroup={() => setScheduleMode('settings')}/>
            <GroupConfigurator scheduleMode={scheduleMode} backToSchedule={() => setScheduleMode('schedule')} type={type} configuration={config}/>
            <MainContainer>
                <h3 className='text-center text-light mb-4'>
                    {type === 'student' ? <i className="fas fa-user-graduate"></i> : <i className="fa fa-user-tie"></i>} Розклад {type === 'student' ? 'занять' : 'викладача'} на {getAccusativeDayOfWeek(date)} {shortDate(date)}
                    {(isLoading) ? <Spinner animation='border' variant="light" className='position-absolute ms-2 mt-2' size='sm'/> : null}
                </h3>
                <ScheduleTable schedule={schedule} selectLesson={selectLesson} configuration={config} type={type} configureGroup={() => setScheduleMode('settings')}/>
                {
                    (schedule?.length) ?
                        <Hint>
                            Клікніть по рядку, щоб дізнатись деталі заняття
                        </Hint> 
                    : null
                }
            </MainContainer>
            <ScheduleModal item={selectedLesson} close={() => selectLesson(null)} type={type} configuration={config}/>
        </>
    );
};

export default Schedule;