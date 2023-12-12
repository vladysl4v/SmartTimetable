import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {useState} from "react";
import {LessonsInformation} from "../LessonsInformation/LessonsInformation.jsx";
import {NotesInformation} from "../NotesInformation/NotesInformation.jsx";
import {MeetingsInformation} from "../MeetingsInformation/MeetingsInformation.jsx";

export const ScheduleModal = ({item, close, msalClient}) => {
    const [modalMode, setModalMode] = useState('lesson')
    if (item === null) {
        return null;
    }
    return (
            <Modal show={item} centered onHide={() => close()}>
            <Modal.Header className='text-center'>
                <Modal.Title>{item.discipline}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='w-100 d-block'>
                {
                    (modalMode === 'lesson') ?
                        <LessonsInformation changeModalMode={setModalMode} item={item}/>
                    : (modalMode === 'notes') ?
                        <NotesInformation item={item} close={()=> setModalMode('lesson')} msalClient={msalClient} goBack={() => setModalMode('lesson')}/>
                    : (modalMode === 'meetings') ?
                        <MeetingsInformation item={item}/>
                    : null
                }
            </Modal.Body>
            <Modal.Footer className='w-100 d-block'>
                <div>
                {
                    (modalMode === 'lesson') 
                    ?  <Button variant="secondary" className='w-100' onClick={() => close()}>
                            Закрити
                       </Button>
                    : <Button variant="secondary" className='w-100' onClick={() => setModalMode('lesson')}>
                            <i className="fa-solid fa-caret-left"></i> Повернутися назад
                      </Button>
                }
                </div>
            </Modal.Footer>
        </Modal>
    )
}