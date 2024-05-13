import {Button} from "react-bootstrap";
import './CalendarButton.css'
import {getFormattedDate} from "../../utils/Formatters.js";

export const CalendarButton = ({description, action, children, type = 'btn', variant = 'light'}) => {
    if (type === 'date') return (
        <div className='text-center'>
            <input onClick={(args) => args.target.showPicker()}
                   defaultValue={getFormattedDate(new Date())}
                   onChange={action}
                   type="date"
                   className={"btn btn-" + variant + " date-button"}
            />
            <br/>
            <small style={{color: 'lightgray'}}>{description}</small>
        </div>
    )
    if (type === 'btn') return (
        <div className='text-center'>
            <Button variant={variant} className='date-button' onClick={action}>{children}</Button>
            <br/>
            <small style={{color: 'lightgray'}}>{description}</small>
        </div>
    )
}