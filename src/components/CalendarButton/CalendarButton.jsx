import {Button} from "react-bootstrap";
import './CalendarButton.css'

export const CalendarButton = ({description, action, children, type = 'btn'}) => {
    if (type === 'date') return (
        <div className='text-center'>
            <input onClick={(args) => args.target.showPicker()} onChange={action} type="date" className="btn btn-outline-light date-button"/>
            <br/>
            <small style={{color: 'lightgray'}}>{description}</small>
        </div>
    )
    if (type === 'btn') return (
        <div className='text-center'>
            <Button variant="light" className='date-button' onClick={action}>{children}</Button>
            <br/>
            <small style={{color: 'lightgray'}}>{description}</small>
        </div>
    )
}