import React, {useState} from 'react';
import styles from "../LessonItem.module.css";
import MeetingModal from "./MeetingModal/MeetingModal.jsx";

const MeetingItem = ({item}) => {
    const [isEventMenuShown, setIsEventMenuShown] = useState(false)

    if (item.meetings === null) {
        return null;
    }

    return (
        <tr>
            <td className="fw-bold">Онлайн-наради</td>
            <td>
                <span className={["fs-5 fw-bold", styles.centered, (!item.meetings.length) ? styles.dataMiss : styles.dataPresent].join(' ')}>
                    {item.meetings.length}
                </span>
                <span>
                    <a onClick={() => setIsEventMenuShown(true)}>
                        <i className={["fa-solid fa-arrow-up-right-from-square fa-lg", styles.far, styles.clickable].join(' ')}></i>
                    </a>
                </span>
            </td>
            <MeetingModal item={item} isShown={isEventMenuShown} setIsShown={setIsEventMenuShown} />
        </tr>
    );
};

export default MeetingItem;