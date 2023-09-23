import React from 'react';

const LessonItem = ({item, ...props}) => {
    const shortTime = `${item.start.slice(0, 5)}-${item.end.slice(0, 5)}`;

    let abbrTeacher = item.teacher;
    if (abbrTeacher.length) {
        abbrTeacher = abbrTeacher.split(" ");
        abbrTeacher = `${abbrTeacher[0]} ${abbrTeacher[1][0]}. ${abbrTeacher[2][0]}.`;
    }
    return (
        <tr {...props}>
            <td></td>
            <td>{shortTime}</td>
            <td>{item.discipline}</td>
            <td>{item.studyType}</td>
            <td>{item.cabinet}</td>
            <td><abbr style={{textDecoration: 'none', border: 'none'}} title={item.teacher}>{abbrTeacher}</abbr></td>
        </tr>
    );
};

export default LessonItem;