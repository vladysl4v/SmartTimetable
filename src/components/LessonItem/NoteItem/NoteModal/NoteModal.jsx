import Modal from "react-bootstrap/Modal";
import {Form, Spinner} from "react-bootstrap";
import styles from "../NoteItem.module.css";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import {MSALScopes} from "../../../../utilities/MSALConfig.js";
import Requests from "../../../../utilities/Requests.js";


const NoteModal = ({item, isShown, setIsShown, msalClient}) => {
    const [isLoading, setIsLoading] = useState(false)
    const authorNote = item.notes.find(x => x.isAuthor === true)
    const currentNotes = item.notes.filter(x => x !== authorNote)
    return (
        <Modal show={isShown} onHide={() => setIsShown(false)} size="lg">
            <Form onSubmit={(event) => createNote(item, event, msalClient, setIsShown, setIsLoading)}>
                <Modal.Header closeButton>
                    <Modal.Title as="h4">Нотатки ({item.discipline})</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        (currentNotes.length) ?
                            (currentNotes.map(note =>
                                <div key={note.noteId} className={["card", styles.note].join(' ')}>
                                    <p className="fw-bold">
                                        Нотатка від {note.authorName}
                                        <span
                                            className={["fw-light", styles.right].join(' ')}>{note.creationDate.toLocaleDateString()} {note.creationDate.toLocaleTimeString()}</span>
                                    </p>
                                    <p className={["fst-italic", styles.far].join(' ')}>{note.message}</p>
                                </div>
                            )) : <p className="text-center"><em>Нотаток не знайдено</em></p>
                    }
                    <hr/>
                    {
                        (authorNote) ?
                            (
                                <div className={["card border-primary", styles.note].join(' ')} style={{border: '2px solid'}} >
                                    <p className="fw-bold">
                                        Ваша нотатка
                                        <span className={["fw-light", styles.right].join(' ')}>{authorNote.creationDate.toLocaleDateString()} {authorNote.creationDate.toLocaleTimeString()}</span>
                                    </p>
                                    <p className={["fst-italic", styles.far].join(' ')}>{authorNote.message}</p>
                                </div>
                            ) : (
                                <div className={["card", styles.note].join(' ')}>
                                    <p className="fw-bold"> <i className="fa-solid fa-circle-plus fa-lg"/> Створити групову нотатку</p>
                                    <Form.Control as="textarea" rows="2" maxLength="256"/>
                                </div>
                            )
                    }
                </Modal.Body>
                <Modal.Footer>
                    {
                        (authorNote === undefined) ?
                        (
                            <Button className="me-auto" variant="outline-primary" type="submit">
                                {(isLoading)
                                    ? <Spinner size="sm"/>
                                    : "Створити нотатку"
                                }
                            </Button>
                        ) : (
                            <Button className="me-auto" variant="outline-danger" onClick={() => removeNote(item, authorNote.noteId, setIsShown, msalClient)}>Видалити нотатку</Button>
                        )
                    }
                    <Button variant="secondary" onClick={() => setIsShown(false)}>Закрити</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

const createNote = async (item, event, msal, setIsShown, setIsLoading) => {
    event.preventDefault();
    event.stopPropagation();
    const message = event.target[1].value;
    if (!message.length) {
        return;
    }
    setIsLoading(true)

    const token = await getAccessToken(msal)

    if (!token) {
        setIsLoading(false)
        return;
    }
    const response = await Requests.postNote(item.id, message, token)

    if (response.status !== 201) {
        setIsLoading(false)
        return;
    }

    response.data.creationDate = new Date()
    item.notes.push(response.data)
    setIsLoading(false)
    setIsShown(false)
}

const removeNote = async (item, noteId, setIsShown, msal) => {
    const token = await getAccessToken(msal)
    if (!token) {
        return;
    }
    const response = await Requests.deleteNote(noteId, token)
    if (response.status !== 200) {
        return;
    }
    item.notes = item.notes.filter(x => x.noteId !== noteId)
    setIsShown(false)
}

const getAccessToken = async (msalClient) => {
    const {instance, accounts} = msalClient;
    const authentication = await instance.acquireTokenSilent({
        scopes: MSALScopes.scopes,
        account: accounts[0]})

    return authentication?.accessToken
}



export default NoteModal;