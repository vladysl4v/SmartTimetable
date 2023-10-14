import React, {useState} from 'react';
import OutageStatus from "./OutageStatus/OutageStatus.jsx";
import DropDownLesson from "./DropDownLesson/DropDownLesson.jsx";

import styles from './LessonItem.module.css';

const LessonItem = ({item, isMobile, showOutages, msalClient}) => {
    const expand = (e) => {
        if (!isMobile && item.notes === undefined) {
            return;
        }
        if (!e.target.className.includes('outage')) {
            setIsExpanded(!isExpanded)
        }
    };
    const [isExpanded, setIsExpanded] = useState(false)
    item.timePeriod = `${item.start.slice(0, 5)}-${item.end.slice(0, 5)}`;
    item.teacherAbbr = item.teacher;
    if (item.teacherAbbr?.length) {
        item.teacherAbbr = item.teacherAbbr.split(" ");
        item.teacherAbbr = `${item.teacherAbbr[0]} ${item.teacherAbbr[1][0]}.${item.teacherAbbr[2][0]}.`;
    }

    return (
        <>
            <tr onClick={expand} className={isExpanded ? styles.expandedHeader : null}>
            {
                (isMobile) ?
                (
                    <>
                        <td>{item.timePeriod}</td>
                        <td>{item.discipline}</td>
                        <td>{item.cabinet}</td>
                    </>
                ) : (
                    <>
                    {

                        (item.outages?.length)
                            ? <OutageStatus outages={item.outages} className="outages"/>
                            : (showOutages) ? <td></td> : null
                    }
                        <td>{item.timePeriod}</td>
                        <td>{item.discipline}</td>
                        <td>{item.studyType}</td>
                        <td>{item.cabinet}</td>
                        <td><abbr className={styles.beauty} title={item.teacher}>{item.teacherAbbr}</abbr></td>
                    </>
                )
            }
            </tr>
            {
                (isExpanded)
                    ? <DropDownLesson item={item} isMobile={isMobile} msalClient={msalClient}/>
                    : null
            }
        </>
    );
};



export default LessonItem;