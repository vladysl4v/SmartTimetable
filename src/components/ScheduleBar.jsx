import React from 'react';
import DateTools from "../utilities/DateTools";

const ScheduleBar = ({isLoading, displayDate, ...props}) => {
    return (
        <div className="d-flex justify-content-between" {...props}>
            <div></div>
            <div style={{marginLeft: '2.75em'}}>
                <h2 >Розклад занять на {DateTools.toString(displayDate)}
                    {
                        (isLoading)
                            ? <i style={{marginLeft: '10px', position: 'absolute', marginTop:'20px'}} className="fa-solid fa-spinner fa-spin fa-xs"></i>
                            : <></>
                    }
                </h2>
            </div>

            <a style={{height: 'fit-content'}} href="#"><i className="fa-solid fa-gear fa-2x"></i></a>
        </div>
    );
};

export default ScheduleBar;