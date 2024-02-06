import {OutageStatus} from "../OutageStatus/OutageStatus.jsx";

export const Lesson = ({lesson, isMobile, onSelected, preferences, type}) => {
    if (isMobile) {
        return (
            <tr onClick={onSelected}>
                <td>{lesson.start.slice(0, 5)}-{lesson.end.slice(0, 5)}</td>
                <td>{lesson.discipline}</td>
                <td>{lesson.cabinet}</td>
            </tr>
        )
    }
    
    return (
        <tr onClick={onSelected} style={{cursor: 'pointer'}}>
            {
                (preferences.outageGroup?.key !== '0')
                    ? (lesson.outages?.length) ? <OutageStatus outages={lesson.outages}/> : <td></td>
                    : null
            }
            <td>{lesson.start.slice(0, 5)}-{lesson.end.slice(0, 5)}</td>
            <td>{lesson.discipline}</td>
            <td>{lesson.studyType}</td>
            <td>{lesson.cabinet}</td>
            <td>{(type === 'student') ? shortenName(lesson.teacher) : lesson.studyGroup}</td>
        </tr>
    )
}

const shortenName = (name) => {
    let abbr = name;
    if (!abbr?.length) {
        return abbr;
    }
    abbr = abbr.split(" ");
    if (abbr.length !== 3) {
        return name;
    }
    return `${abbr[0]} ${abbr[1][0]}.${abbr[2][0]}.`;
}