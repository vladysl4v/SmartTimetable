import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {useEffect, useState} from "react";
import {LessonsInformation} from "../LessonsInformation/LessonsInformation.jsx";
import {NotesInformation} from "../NotesInformation/NotesInformation.jsx";
import {MeetingsInformation} from "../MeetingsInformation/MeetingsInformation.jsx";
import {getAccessToken, getStudentLessonDetails, getTeacherLessonDetails} from "../../utils/Requests.js";

export const ScheduleModal = ({item, close, type, configuration}) => {
    const [modalMode, setModalMode] = useState('lesson')
    const [lessonDetails, setLessonDetails] = useState()
    useEffect(() => { loadLessonDetails(item, setLessonDetails, type, configuration) }, [item])
    
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
                        <LessonsInformation changeModalMode={setModalMode} item={item} lessonDetails={lessonDetails} type={type} isAuthorized={configuration.isAuthorized()}/>
                    : (modalMode === 'notes') ?
                        <NotesInformation identifier={item.id} lessonDetails={lessonDetails} close={()=> setModalMode('lesson')} configuration={configuration} goBack={() => setModalMode('lesson')}/>
                    : (modalMode === 'meetings') ?
                        <MeetingsInformation lessonDetails={lessonDetails}/>
                    : null
                }
            </Modal.Body>
            <Modal.Footer className='w-100 d-block'>
                <div>
                {
                    (modalMode === 'lesson') 
                    ?  <Button variant="secondary" className='w-100' onClick={() => {
                            close()
                            setLessonDetails(null)
                        }}>
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

const loadLessonDetails = async (item, setDetails, type, configuration) => {
    if (!item || !configuration.isAuthorized()) {
        return;
    }

    const accessToken = await getAccessToken(configuration.msalClient, configuration.account)
    let response;
    if (type === 'student') {
        response = await getStudentLessonDetails(item.id, item.date, item.start, item.end, accessToken)
    } else {
        response = await getTeacherLessonDetails(item.id, item.date, item.start, item.end, accessToken)
    }
    if (response.status === 200) {
        response.data.notes.forEach(note => {
                note.creationDate = new Date(note.creationDate)
        })
        setDetails(response.data)
    } else {
        console.error(response)
    }
}