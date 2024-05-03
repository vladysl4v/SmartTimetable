import './Footer.css'
import {OverlayTrigger, Popover} from "react-bootstrap";

export const Footer = () => {
    const mail = "arkhypenkov.corp@gmail.com";
    return (
        <div className='footer d-flex mt-3 px-4 text-center'>
            <OverlayTrigger trigger="click" placement="top" overlay={mailPopover(mail)}>
                <p className='p-2 link cursor-pointer user-select-none' tabIndex="-1"><i className="fa fa-envelope"></i> contact</p>
            </OverlayTrigger>
            <a className='p-2 link' tabIndex="-1" href='https://github.com/vladysl4v/SmartTimetable'><i className="fab fa-github"></i> github</a>
            <a className='p-2 link' tabIndex="-1" href='https://www.gnu.org/licenses/gpl-3.0.html#license-text'><i className="fa fa-scale-balanced"></i> license</a>
            <a className='ms-auto link mt-2' tabIndex="-1" href='https://www.linkedin.com/in/arkhypenkov'>by Arkhypenkov Vladyslav</a>
        </div>
    )
}

const mailPopover = (mail) => (
    <Popover id="popover-positioned-top" className={"px-3 py-2"}>
        <span className="user-select-all font-monospace">
            {mail}
        </span>
        <i className="fa fa-copy ms-2 cursor-pointer" onClick={() => navigator.clipboard.writeText(mail)}></i>
    </Popover>
);