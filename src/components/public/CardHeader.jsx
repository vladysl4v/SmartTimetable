import React from 'react';
import Spinner from "./ui/Spinner";

const CardHeader = ({text, textStyle, isLoading, ...props}) => {
    return (
        <div className="d-flex justify-content-between" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} {...props}>
            <div>
                {/* brand logo */}
            </div>
            <div style={textStyle} className="text-center">
                <h2>
                    {text}
                    <Spinner isLoading={isLoading} style={{marginLeft: '10px', position: 'absolute', marginTop:'20px'}} />
                </h2>
            </div>
            {props.children}
        </div>
    );
};

export default CardHeader;