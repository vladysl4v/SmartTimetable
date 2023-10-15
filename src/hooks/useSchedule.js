import {useEffect, useState} from 'react';
import {useCookies} from "react-cookie";
import Requests from "../utilities/Requests.js";
import {MSALScopes} from "../utilities/MSALConfig.js";

const useSchedule = (msalClient) => {
    const { instance, accounts } = msalClient;
    const [cookies] = useCookies(['studyGroup', 'outageGroup'])
    const [date, setDate] = useState(new Date())
    const [loading, setLoading] = useState(false)
    const [schedule, setSchedule] = useState([])

    useEffect(() => { loadSchedule(accounts, date, cookies, instance, setLoading, setSchedule) }, [date])

    return [schedule, loading, date, setDate]
};

const loadSchedule = async (accounts, date, cookies, instance, setLoading, setSchedule) => {
    if (!cookies.studyGroup) {
        return;
    }
    const datetime = date.toISOString().slice(0, 19)
    setLoading(true)
    let response;
    if (accounts.length) {
        response = await getPersonalSchedule(instance, accounts, datetime, cookies)
    } else {
        response = await getAnonymousSchedule(datetime, cookies)
    }
    if (response.status === 200) {
        response.data.schedule.forEach(item => {
            item.notes.forEach(note => {
                note.creationDate = new Date(note.creationDate)
                note.creationDate.setTime(note.creationDate.getTime() + note.creationDate.getTimezoneOffset() * 60000)
            })
        })
        setSchedule(response.data.schedule)
    }
    setLoading(false)
}

const getAnonymousSchedule = async (datetime, cookies) => {
    return await Requests.getSchedule(datetime, datetime, cookies.studyGroup, cookies.outageGroup)
}

const getPersonalSchedule = async (instance, accounts, datetime, cookies) => {
    let authentication;
    try {
        authentication = await instance.acquireTokenSilent({
            scopes: MSALScopes.scopes,
            account: accounts[0],
        });
    } catch (ex) {
        console.error(ex)
        return await getAnonymousSchedule(datetime, cookies)
    }
    return await Requests.getPersonalSchedule(datetime, datetime, cookies.studyGroup, cookies.outageGroup, authentication.accessToken)
}

export default useSchedule;