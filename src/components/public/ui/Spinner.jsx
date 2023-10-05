import React from 'react';

const Spinner = ({isLoading, ...props}) => {
    return (
        (isLoading)
        ? <i {...props} className="fa-solid fa-spinner fa-spin fa-xs"></i>
        : <></>
    );
};

export default Spinner;