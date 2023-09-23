import React from 'react';

const DateSelector = ({onchange, defaultValue, references, ...props}) => {
    const fireOnChangeEvent = (args) => {
        onchange(args)
        references.forEach(ref => ref.current.checked = false)
    }

    return (
        <input
            onClick={(args) => args.target.showPicker()}
            name="btnradio"
            type="date"
            className="btn btn-primary"
            onChange={fireOnChangeEvent}
            defaultValue={defaultValue}
            {...props}
        />
    );
};

export default DateSelector;