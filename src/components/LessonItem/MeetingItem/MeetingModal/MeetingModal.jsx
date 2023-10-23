import Modal from "react-bootstrap/Modal";

import Button from "react-bootstrap/Button";
import React from "react";


const MeetingModal = ({item, isShown, setIsShown}) => {
    return (
        <Modal show={isShown} onHide={() => setIsShown(false)} size="lg">
            <Modal.Header>
                <Modal.Title as="h6">Онлайн наради ({item.discipline})</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <table className="table text-center" style={{verticalAlign: 'middle'}}>
                <thead>
                <tr className="fw-bold">
                    <td>Час</td>
                    <td>Тема</td>
                    <td>Посилання</td>
                </tr>
                </thead>
                <tbody>
                {
                    (item.meetings.length) ?
                    item.meetings.map(meeting =>
                        <tr>
                            <td>{meeting.start.slice(0, 5)}-{meeting.end.slice(0, 5)}</td>
                            <td>{meeting.title}</td>
                            <td><a href={meeting.link}>Перейти на нараду</a></td>
                        </tr>
                    ) : <tr><td colSpan="20"><em>Онлайн-нарад не знайдено</em></td></tr>
                }
                </tbody>
            </table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setIsShown(false)}>Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
}



export default MeetingModal;