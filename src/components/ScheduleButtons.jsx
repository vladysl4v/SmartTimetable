import React from 'react';
import DateTools from "../utilities/DateTools";
import DateButton from "./ui/DateButton";
import DateSelector from "./ui/DateSelector";

const ScheduleButtons = ({displayDate, setDisplayDate, ...props}) => {
    const initialDate = new Date(displayDate)
    const datePickerValue = DateTools.toShortISOString(DateTools.addDays(initialDate, 2));
    function changeDate(amount) {
        setDisplayDate(DateTools.addDays(initialDate, amount))
    }

    return (
        <div className="btn-group mt-4 d-flex justify-content-center" style={{marginLeft: '50px', marginRight: '50px'}} role="group" {...props}>
            <DateButton id="yesterday" onclick={() => changeDate(-1)} label="Учора"/>
            <DateButton id="today" onclick={() => changeDate(0)} label="Сьогодні" defaultChecked/>
            <DateButton id="tomorrow" onclick={() => changeDate(+1)} label="Завтра"/>
            <DateSelector onchange={(args) => setDisplayDate(args.target.valueAsDate)} defaultValue={datePickerValue}/>
        </div>
    );
};

export default ScheduleButtons;