import React, {useEffect, useState} from "react";
import CardHeader from "../components/public/CardHeader";
import ScheduleButtons from "../components/schedule/ScheduleButtons";
import RequestService from "../utilities/RequestService";
import ScheduleTable from "../components/schedule/ScheduleTable";
import {Link} from "react-router-dom";
import DateTools from "../utilities/DateTools";
import {useAccount, useMsal} from "@azure/msal-react";
import {MSALScopes} from "../utilities/MSALConfig";
import {useCookies} from "react-cookie";

function Schedule({date}) {
    async function fetchPersonalSchedule() {
        setIsScheduleLoading(true)
        if (!account) {
            return;
        }
        const tokenResponse = await instance.acquireTokenSilent({
            scopes: MSALScopes.scopes,
            account: account,
        });
        if (!tokenResponse) {
            return;
        }
        const response = await RequestService.getPersonalSchedule(displayDate, tokenResponse.accessToken)
        setIsScheduleLoading(false)
        if (response) {
            setLessons(response.schedule)
        }
    }
    async function fetchAnonSchedule() {
        if (cookies.studyGroup === "") {
            return;
        }
        setIsScheduleLoading(true)
        const response = await RequestService.getAnonymousSchedule(displayDate, cookies.studyGroup, cookies.outageGroup)
        setIsScheduleLoading(false)
        if (response) {
            setLessons(response.schedule)
        }
    }
    const { instance, accounts } = useMsal();
    const account = useAccount(accounts[0]);

    const [isScheduleLoading, setIsScheduleLoading] = useState(false)
    const [displayDate, setDisplayDate] = useState(date)
    const [lessons, setLessons] = useState([])
    const [cookies] = useCookies(['studyGroup', 'outageGroup'])

    useEffect(() => { fetchAnonSchedule() }, [displayDate])

    return (
        <div className="App">
            <CardHeader text={`Розклад занять на ${DateTools.toString(displayDate)}`} textStyle={{marginLeft: '2.75em'}} isLoading={isScheduleLoading} >
                <Link style={{height: 'fit-content'}} to="/settings"><i style={{color: '#000000'}} className="fa-solid fa-hover-spin fa-gear fa-2x"></i></Link>
            </CardHeader>
            <ScheduleButtons displayDate={date} setDisplayDate={setDisplayDate} />
            <ScheduleTable elements={lessons}/>
        </div>
    );
}

export default Schedule;
