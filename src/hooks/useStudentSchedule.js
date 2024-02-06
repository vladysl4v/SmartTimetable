import {useEffect, useState} from 'react';
import {getStudentPersonalSchedule, getStudentGuestSchedule} from "../utils/Requests.js";
import {MSALScopes} from "../utils/MSALConfig.js";
import {useLocalStorage} from "./useLocalStorage.js";

export const useStudentSchedule = (instance, accounts) => {
    const [localStorage] = useLocalStorage()
    const [date, setDate] = useState(new Date())
    const [isLoading, setIsLoading] = useState(false)
    const [schedule, setSchedule] = useState([])

    useEffect(() => { loadSchedule(accounts, date, localStorage, instance, setIsLoading, setSchedule) }, [date])

    return [schedule, isLoading, date, setDate]
};

const loadSchedule = async (accounts, date, localStorage, instance, setLoading, setSchedule) => {
    if (!localStorage.studyGroup) {
        return;
    }

    setLoading(true)
    let response;
    if (accounts.length) {
        response = await getPersonalizedSchedule(instance, accounts, date, localStorage)
    } else {
        response = await getAnonymousSchedule(date, localStorage)
    }
    if (response.status === 200) {
        response.data.schedule.forEach(item => {
            item.notes?.forEach(note => {
                note.creationDate = new Date(note.creationDate)
                note.creationDate.setTime(note.creationDate.getTime() + note.creationDate.getTimezoneOffset() * 60000)
            })
        })
        setSchedule(response.data.schedule)
    }
    setLoading(false)
}

const getAnonymousSchedule = async (datetime, localStorage) => {
    return await getStudentGuestSchedule(datetime, localStorage.studyGroup?.key, localStorage.outageGroup?.key)
}

const getPersonalizedSchedule = async (instance, accounts, datetime, localStorage) => {
    let authentication;
    try {
        authentication = await instance.acquireTokenSilent({
            scopes: MSALScopes.scopes,
            account: accounts[0],
        });
    } catch (ex) {
        console.error(ex)
        return await getAnonymousSchedule(datetime, localStorage)
    }
    return await getStudentPersonalSchedule(datetime, localStorage.studyGroup?.key, localStorage.outageGroup?.key, authentication.accessToken)
}