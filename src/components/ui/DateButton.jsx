import React from 'react';

const DateButton = ({id, label, onclick, ...props}) => {
    return (
        <>
            <input {...props} id={id} name="btnradio" type="radio" autoComplete="off" className="btn-check"/>
            <label className="btn btn-primary" htmlFor={id} onClick={onclick}>{label}</label>
        </>
    );
};

export default DateButton;