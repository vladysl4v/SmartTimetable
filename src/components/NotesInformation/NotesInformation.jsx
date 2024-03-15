import {Button, Form} from "react-bootstrap";
import {deleteNote, postNote, getAccessToken} from "../../utils/Requests.js";
import {Hint} from "../../layout/Hint/Hint.jsx";
import {shortenName} from "../../utils/Formatters.js";

export const NotesInformation = ({identifier, configuration, lessonDetails, goBack}) => {
  if (identifier === null) {
    return null;
  }

  const authorNote = lessonDetails.notes.find(x => x.authorId === configuration.account.localAccountId)
  const currentNotes = lessonDetails.notes.filter(x => x !== authorNote)
    return (
        <>
          <Hint>
            Тут відібражаються нотатки зроблені студентами Вашої групи на цю пару
          </Hint>
          {
            (currentNotes.length) ?
                (currentNotes.map(note =>
                    <div key={note.noteId} className="card mt-2 p-2">
                      <p className="fw-bold">
                        Нотатка від {shortenName(note.authorName)}
                        <span
                            className="fw-light float-end">{note.creationDate.toLocaleDateString()} {note.creationDate.toLocaleTimeString()}</span>
                      </p>
                      <p className="fst-italic ms-3">{note.message}</p>
                    </div>
                )) : <p className="text-center"><em>Нотаток не знайдено</em></p>
          }
          <hr/>
          {
            (authorNote) ?
                (
                    <div className="card border-3 border-light-subtle mt-2 p-2">
                      <p className="fw-bol">
                        Ваша нотатка
                        <span className="fw-light float-end">{authorNote.creationDate.toLocaleDateString()} {authorNote.creationDate.toLocaleTimeString()}</span>
                      </p>
                      <p className="fst-italic ms-3">{authorNote.message}</p>
                      <Button className="mt-2" variant="outline-danger" onClick={() => removeNote(lessonDetails, authorNote.noteId, goBack, configuration)}>
                        Видалити нотатку
                      </Button>
                    </div>
                ) : (
                    <Form onSubmit={(event) => createNote(identifier, event, configuration, goBack, lessonDetails)}>
                      <div className="card border-3 border-light-subtle mt-2 p-2">
                        <p className="fw-bold"><i className="fa-solid fa-circle-plus fa-lg mt-3"/> Створити групову нотатку</p>
                        <Form.Control id='notes' as="textarea" rows="2" maxLength="256"/>
                        <Button className="mt-2 f" variant="outline-primary" type="submit">
                          Створити нотатку
                        </Button>
                      </div>
                    </Form>
                )
          }
        </>
    )
}

const createNote = async (identifier, event, configuration, close, lessonDetails) => {
  event.preventDefault();
  event.stopPropagation();
  const message = event.target[0].value;
  if (!message.length) {
    return;
  }

  const token = await getAccessToken(configuration.msalClient, configuration.account)

  if (!token) {
    return;
  }
  const response = await postNote(identifier, message, token)

  if (response.status !== 201) {
    return;
  }

  response.data.creationDate = new Date()
  lessonDetails.notes.push(response.data)
  close()
}

const removeNote = async (lessonDetails, noteId, close, configuration) => {
  const token = await getAccessToken(configuration.msalClient, configuration.account)
  if (!token) {
    return;
  }
  const response = await deleteNote(noteId, token)
  if (response.status !== 200) {
    return;
  }
  lessonDetails.notes = lessonDetails.notes.filter(x => x.noteId !== noteId)
  close()
}