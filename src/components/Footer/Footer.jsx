import './Footer.css'

export const Footer = () => {
    return (
        <div className='footer d-flex mt-3 px-4 text-center'>
            <a className='p-2 link' href='mailto:arkhypenkov.corp@gmail.com'><i className="fa fa-envelope"></i> contact</a>
            <a className='p-2 link' href='https://github.com/vladysl4v/SmartTimetable'><i className="fab fa-github"></i> github</a>
            <a className='p-2 link' href='https://www.gnu.org/licenses/gpl-3.0.html#license-text'><i className="fa fa-scale-balanced"></i> license</a>
            <a className='ms-auto link' href='https://www.linkedin.com/in/arkhypenkov'>by Arkhypenkov Vladyslav</a>
        </div>
    )
}