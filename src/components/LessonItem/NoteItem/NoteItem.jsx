import React, {useState} from 'react';
import styles from "../LessonItem.module.css";
import NoteModal from "./NoteModal/NoteModal.jsx";

const NoteItem = ({item, msalClient}) => {
    const [isNoteMenuShown, setIsNoteMenuShown] = useState(false);

    if (item.notes === null) {
        return null;
    }

    return (
            <tr>
                <td className="fw-bold">Групові нотатки</td>
                <td>
                    <span className={["fs-5 fw-bold", styles.centered, (!item.notes.length) ? styles.dataMiss : styles.dataPresent].join(' ')}>
                        {item.notes.length}
                    </span>
                    <span>
                        <a onClick={() => setIsNoteMenuShown(true)}>
                            <i className={["fa-solid fa-arrow-up-right-from-square fa-lg", styles.far, styles.clickable].join(' ')}></i>
                        </a>
                    </span>
                </td>
                <NoteModal item={item} isShown={isNoteMenuShown} setIsShown={setIsNoteMenuShown} msalClient={msalClient} />
            </tr>
    );
};

export default NoteItem;