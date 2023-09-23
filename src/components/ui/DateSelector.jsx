import React from 'react';

const DateSelector = ({onchange, defaultValue, setIsChecked, ...props}) => {
    return (
        <input
            onClick={(args) => args.target.showPicker()}
            name="btnradio"
            type="date"
            className="btn btn-primary"
            onChange={onchange}
            defaultValue={defaultValue}
            {...props}
        />
    );
};

export default DateSelector;