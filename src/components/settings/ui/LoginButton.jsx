import React from 'react';

const LoginButton = ({text, loginStatus, onclick}) => {
    return (
            <button className="btn btn-outline-primary" onClick={onclick}>
                {(loginStatus === "login" || loginStatus === "logout")
                    ? <><i className="fa-solid fa-spinner fa-spin fa-xl" style={{color: '#0526a8'}}></i> Вхід...</>
                    : <><i className="fa-brands fa-microsoft fa-xl" style={{color: '#0526a8'}}></i>{text}</>
                }
            </button>
    );
};

export default LoginButton;