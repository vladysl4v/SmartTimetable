import {OutageStatus} from "../OutageStatus/OutageStatus.jsx";

export const Lesson = ({lesson, isMobile, onSelected}) => {
    if (isMobile) {
        return (
            <tr onClick={onSelected}>
                <td>{lesson.start.slice(0, 5)}-{lesson.end.slice(0, 5)}</td>
                <td>{lesson.discipline}</td>
                <td>{lesson.cabinet}</td>
            </tr>
        )
    }
    
    let teacherAbbr = lesson.teacher;
    if (teacherAbbr?.length) {
        teacherAbbr = teacherAbbr.split(" ");
        teacherAbbr = `${teacherAbbr[0]} ${teacherAbbr[1][0]}.${teacherAbbr[2][0]}.`;
    }
    
    return (
        <tr onClick={onSelected} style={{cursor: 'pointer'}}>
            {
            (lesson.outages?.length)
                ? <OutageStatus outages={lesson.outages}/>
                : <td></td>
            }
            <td>{lesson.start.slice(0, 5)}-{lesson.end.slice(0, 5)}</td>
            <td>{lesson.discipline}</td>
            <td>{lesson.studyType}</td>
            <td>{lesson.cabinet}</td>
            <td>{teacherAbbr}</td>
        </tr>
    )
}