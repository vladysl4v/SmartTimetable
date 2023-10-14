import React, {useRef} from "react";
import ScheduleTable from "../components/ScheduleTable/ScheduleTable.jsx";
import useSchedule from "../hooks/useSchedule.js";
import Title from "../components/Title/Title.jsx";

import styles from './Schedule.module.css'
import {useMsal} from "@azure/msal-react";

const Schedule = () => {
    const msalClient = useMsal()
    const references = [useRef(null), useRef(null), useRef(null)]
    const [schedule, loading, date, setDate] = useSchedule(msalClient)

    return (
        <div className="App">
            <Title navigation="/settings" iconStyles={["fa-solid fa-gear", styles.iconSpin].join(' ')} loading={loading}>{`Розклад занять на ${date.toLocaleDateString('uk-UA')}`}</Title>
            <section className={"btn-group mt-4 d-flex justify-content-center " + styles.grouping} role="group">
                <DateButton id="yesterday" onclick={() => changeDate(-1, setDate)} link={references[0]}>Учора</DateButton>
                <DateButton id="today" onclick={() => changeDate(0, setDate)} link={references[1]} isChecked={true}>Сьогодні</DateButton>
                <DateButton id="tomorrow" onclick={() => changeDate(+1, setDate)} link={references[2]}>Завтра</DateButton>
                <input
                    onClick={showPicker}
                    defaultValue={new Date().toISOString().slice(0, 10)}
                    onChange={(args) => changeDateFromPicker(args, setDate, references)}
                    type="date"
                    name="btnradio"
                    className={"btn btn-primary " + styles.datePicker} />
            </section>
            <ScheduleTable elements={schedule} msalClient={msalClient}/>
        </div>
    );
}

const DateButton = ({id, onclick, link, isChecked = false, ...props}) => {
    return (
        <>
            <input id={id} name="btnradio" type="radio" autoComplete="off" ref={link} defaultChecked={isChecked} className="btn-check"/>
            <label className="btn btn-primary" htmlFor={id} onClick={onclick}>{props.children}</label>
        </>
    );
};

const showPicker = (args) => {
    args.target.showPicker()
}

const changeDateFromPicker = (args, setDate, references) => {
    setDate(args.target.valueAsDate)
    references.forEach(ref => ref.current.checked = false)
}

const changeDate = (amount, setDate) => {
    const date = new Date()
    date.setDate(date.getDate() + amount)
    setDate(date)
}
export default Schedule;
