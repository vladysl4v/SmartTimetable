import React from 'react';

const DateButton = ({id, label, onclick, reference, ...props}) => {
    return (
        <>
            <input {...props} id={id} name="btnradio" type="radio" autoComplete="off" ref={reference} className="btn-check"/>
            <label className="btn btn-primary" htmlFor={id} onClick={onclick}>{label}</label>
        </>
    );
};

export default DateButton;