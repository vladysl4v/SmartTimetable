import React from 'react';
import NoteItem from "../NoteItem/NoteItem.jsx";

import styles from './DropDownLesson.module.css';
import MeetingItem from "../MeetingItem/MeetingItem.jsx";

import MobileOnlyRows from "./MobileOnlyRows/MobileOnlyRows.jsx";

const DropDownLesson = ({item, isMobile, msalClient}) => {

    return (
        <tr >
            <td colSpan="20" style={{paddingTop:'0px'}}>
                <table className={["table mb-0 table-sm table-light text-center align-middle", styles.mainTable].join(' ')}>
                    <tbody className={[styles.reallyBordered, styles.leader].join(' ')}>
                    <MobileOnlyRows isMobile={isMobile} item={item}/>
                    <NoteItem item={item} msalClient={msalClient}/>
                    <MeetingItem item={item} />
                    </tbody>
                </table>
            </td>
        </tr>
    );
};

export default DropDownLesson;