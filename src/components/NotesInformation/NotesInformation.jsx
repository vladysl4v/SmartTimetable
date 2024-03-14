import {Button, Form} from "react-bootstrap";
import {deleteNote, postNote, getAccessToken} from "../../utils/Requests.js";
import {Hint} from "../../layout/Hint/Hint.jsx";
import {shortenName} from "../../utils/Formatters.js";

export const NotesInformation = ({item, msalClient, goBack, activeAccount}) => {
  if (item === null) {
    return null;
  }

  const authorNote = item.notes.find(x => x.authorId === activeAccount.localAccountId)
  const currentNotes = item.notes.filter(x => x !== authorNote)
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
                      <Button className="mt-2" variant="outline-danger" onClick={() => removeNote(item, authorNote.noteId, goBack, msalClient, activeAccount)}>
                        Видалити нотатку
                      </Button>
                    </div>
                ) : (
                    <Form onSubmit={(event) => createNote(item, event, msalClient, goBack, activeAccount)}>
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

const createNote = async (item, event, msal, close, activeAccount) => {
  event.preventDefault();
  event.stopPropagation();
  const message = event.target[0].value;
  if (!message.length) {
    return;
  }

  const token = await getAccessToken(msal, activeAccount)

  if (!token) {
    return;
  }
  const response = await postNote(item.id, message, token)

  if (response.status !== 201) {
    return;
  }

  response.data.creationDate = new Date()
  item.notes.push(response.data)
  close()
}

const removeNote = async (item, noteId, close, msal, activeAccount) => {
  const token = await getAccessToken(msal, activeAccount)
  if (!token) {
    return;
  }
  const response = await deleteNote(noteId, token)
  if (response.status !== 200) {
    return;
  }
  item.notes = item.notes.filter(x => x.noteId !== noteId)
  close()
}