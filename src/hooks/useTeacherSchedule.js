import {useEffect, useState} from 'react';
import {getTeacherPersonalSchedule, getTeacherGuestSchedule} from "../utils/Requests.js";
import {MsalScopes} from "../../msal.config.js";
import {useLocalStorage} from "./useLocalStorage.js";

export const useTeacherSchedule = (instance, accounts) => {
    const [localStorage] = useLocalStorage()
    const [date, setDate] = useState(new Date())
    const [isLoading, setIsLoading] = useState(false)
    const [schedule, setSchedule] = useState([])

    useEffect(() => { loadTeacherSchedule(accounts, date, localStorage, instance, setIsLoading, setSchedule) }, [date])

    return [schedule, isLoading, date, setDate]
};

const loadTeacherSchedule = async (accounts, date, localStorage, instance, setLoading, setSchedule) => {
    if (!localStorage.teacherId) {
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
        setSchedule(response.data.schedule)
    }
    setLoading(false)
}

const getAnonymousSchedule = async (datetime, localStorage) => {
    return await getTeacherGuestSchedule(datetime, localStorage.teacherId?.key, localStorage.outageGroup?.key)
}

const getPersonalizedSchedule = async (instance, accounts, datetime, localStorage) => {
    let authentication;
    try {
        authentication = await instance.acquireTokenSilent({
            scopes: MsalScopes.scopes,
            account: accounts[0],
        });
    } catch (ex) {
        console.error(ex)
        return await getAnonymousSchedule(datetime, localStorage)
    }
    return await getTeacherPersonalSchedule(datetime, localStorage.teacherId?.key, localStorage.outageGroup?.key, authentication.accessToken)
}