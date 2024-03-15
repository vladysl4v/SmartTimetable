import {useEffect, useState} from 'react';
import {getStudentSchedule, getTeacherSchedule} from "../utils/Requests.js";

export const useSchedule = (type, config) => {
    const [date, setDate] = useState(new Date())
    const [isLoading, setIsLoading] = useState(false)
    const [schedule, setSchedule] = useState([])
    
    useEffect(() => { loadSchedule(date, config.localStorage, setIsLoading, setSchedule, type) }, [date, type, config.localStorage.studyGroup, config.localStorage.teacherId]);

    return [schedule, isLoading, date, setDate]
};

const loadSchedule = async (date, localStorage,setLoading, setSchedule, type) => {
    if ((type === 'student' && !localStorage.studyGroup?.key) || (type === 'teacher' && !localStorage.teacherId?.key)) {
        return;
    }
    setLoading(true)
    let response;
    if (type === 'teacher') {
        response = await getTeacherSchedule(date, localStorage.teacherId?.key, localStorage.outageGroup?.key)
    } else {
        response = await getStudentSchedule(date, localStorage.studyGroup?.key, localStorage.outageGroup?.key)
    }
    if (response.status === 200) {
        setSchedule(response.data.schedule)
    } else {
        setSchedule(undefined)
    }
    setLoading(false)
}