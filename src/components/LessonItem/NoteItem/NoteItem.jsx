import React, {useState} from 'react';
import styles from './NoteItem.module.css';
import NoteModal from "./NoteModal/NoteModal.jsx";

const NoteItem = ({item, msalClient}) => {
    const [isNoteMenuShown, setIsNoteMenuShown] = useState(false);

    return (
        <>
            <td>
                <span className={["fs-5 fw-bold", styles.centered, (!item.notes.length) ? styles.notesMiss : styles.notesPresent].join(' ')}>
                    {item.notes.length}
                </span>
                <span>
                    <a onClick={() => setIsNoteMenuShown(true)}>
                        <i className={["fa-solid fa-arrow-up-right-from-square fa-lg", styles.far, styles.iconPresent].join(' ')}></i>
                    </a>
                </span>
            </td>
            <NoteModal item={item} isShown={isNoteMenuShown} setIsShown={setIsNoteMenuShown} msalClient={msalClient} />
        </>
    );
};

export default NoteItem;