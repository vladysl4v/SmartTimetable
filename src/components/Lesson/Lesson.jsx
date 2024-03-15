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
            <td>{(type === 'student') ? shortenName(lesson.teacher) : lesson.studyGroup}</td>
        </tr>
    )
}