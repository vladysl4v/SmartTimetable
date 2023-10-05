import React, {useRef} from 'react';
import DateTools from "../../utilities/DateTools";
import DateButton from "./ui/DateButton";
import DateSelector from "./ui/DateSelector";

const ScheduleButtons = ({displayDate, setDisplayDate, ...props}) => {
    function changeDate(amount) {
        setDisplayDate(DateTools.addDays(initialDate, amount))
    }
    const initialDate = new Date(displayDate)
    const datePickerValue = DateTools.toShortISOString(initialDate)
    const [button3Ref, button2Ref, button1Ref] = [useRef(null), useRef(null), useRef(null)]

    return (
        <div className="btn-group mt-4 d-flex justify-content-center" style={{marginLeft: '50px', marginRight: '50px'}} role="group" {...props}>
            <DateButton label="Учора" id="yesterday" onclick={() => changeDate(-1)} reference={button1Ref}/>
            <DateButton label="Сьогодні" id="today" onclick={() => changeDate(0)} reference={button2Ref} defaultChecked/>
            <DateButton label="Завтра" id="tomorrow" onclick={() => changeDate(+1)} reference={button3Ref}/>
            <DateSelector onchange={(args) => setDisplayDate(args.target.valueAsDate)} defaultValue={datePickerValue} references={[button1Ref, button2Ref, button3Ref]}/>
        </div>
    );
};

export default ScheduleButtons;