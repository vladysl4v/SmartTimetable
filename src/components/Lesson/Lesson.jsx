import {OutageStatus} from "../OutageStatus/OutageStatus.jsx";
import {shortenName} from "../../utils/Formatters.js";

export const Lesson = ({lesson, onSelected, configuration, type}) => {
    if (configuration.isMobile) {
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
                (configuration.isOutagesAllowed())
                    ? (lesson.outages?.length) ? <OutageStatus outages={lesson.outages}/> : <td></td>
                    : null
            }
            <td>{lesson.start.slice(0, 5)}-{lesson.end.slice(0, 5)}</td>
            <td>{lesson.discipline}</td>
            <td>{lesson.studyType}</td>
            <td>{lesson.cabinet}</td>
            <td>{(type === 'student') ? shortenName(lesson.teacher) : distinctStudyGroups(lesson.studyGroups)}</td>
        </tr>
    )
}

const distinctStudyGroups = (studyGroups) => {
    if (!studyGroups?.length) {
        return '';
    }
    if (studyGroups.length === 1) {
        return studyGroups[0];
    }
    if (studyGroups.length < 5) {
        return `${studyGroups.length} групи`;
    }
    return `${studyGroups.length} груп`;
}