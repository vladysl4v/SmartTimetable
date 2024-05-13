import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {useEffect, useState} from "react";
import {LessonsInformation} from "../LessonsInformation/LessonsInformation.jsx";
import {NotesInformation} from "../NotesInformation/NotesInformation.jsx";
import {MeetingsInformation} from "../MeetingsInformation/MeetingsInformation.jsx";
import {getAccessToken, getStudentLessonDetails, getTeacherLessonDetails, headIsCabinetExists} from "../../utils/Requests.js";
import {CabinetInformation} from "../CabinetInformation/CabinetInformation.jsx";

export const ScheduleModal = ({item, close, type, configuration}) => {
    const [modalMode, setModalMode] = useState('lesson')
    const [lessonDetails, setLessonDetails] = useState()
    const [isCabinetExists, setCabinetExistence] = useState()
    useEffect(() => {
        (async () => {
            await loadCabinetExistence(item?.cabinet, setCabinetExistence, configuration)
            await loadLessonDetails(item, setLessonDetails, type, configuration)
        })()
    }, [configuration, item, type])
    
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
                        <LessonsInformation changeModalMode={setModalMode} item={item} lessonDetails={lessonDetails} type={type} isAuthorized={configuration.isAuthorized()} isCabinetExists={isCabinetExists}/>
                    : (modalMode === 'notes') ?
                        <NotesInformation identifier={item.id} lessonDetails={lessonDetails} close={()=> setModalMode('lesson')} configuration={configuration} goBack={() => setModalMode('lesson')}/>
                    : (modalMode === 'meetings') ?
                        <MeetingsInformation lessonDetails={lessonDetails}/>
                    : (modalMode === 'cabinet') ?
                        <CabinetInformation cabinet={item.cabinet} configuration={configuration}/>
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
    let lessonDetailsResponse;
    
    if (type === 'student') {
        lessonDetailsResponse = await getStudentLessonDetails(item.id, item.date, item.start, item.end, accessToken)
    } else {
        lessonDetailsResponse = await getTeacherLessonDetails(item.id, item.date, item.start, item.end, accessToken)
    }
    
    if (lessonDetailsResponse.status === 200) {
        lessonDetailsResponse.data.notes.forEach(note => {
                note.creationDate = new Date(note.creationDate)
        })
        setDetails(lessonDetailsResponse.data)
    } else {
        console.error(lessonDetailsResponse)
    }
}

const loadCabinetExistence = async (cabinet, setCabinetExistence, configuration) => {
    setCabinetExistence(false)
    if (!cabinet || cabinet === 'Teams(online)' || !configuration.isAuthorized()) {
        return;
    }
    const accessToken = await getAccessToken(configuration.msalClient, configuration.account)
    const isCabinetExistsResponse = await headIsCabinetExists(cabinet, accessToken)
    setCabinetExistence(isCabinetExistsResponse.status === 200);
}