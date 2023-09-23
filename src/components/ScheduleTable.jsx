import React from 'react';
import LessonItem from "./ui/LessonItem";

const ScheduleTable = ({elements, isLoading, ...props}) => {
    return (
        <div style={{marginTop: '20px'}} {...props}>
            <table className="table text-center">
                <thead>
                <tr>
                    <th>Світло</th>
                    <th>Час навчання</th>
                    <th>Дисципліна</th>
                    <th>Тип заняття</th>
                    <th>Аудиторія</th>
                    <th>Викладач</th>
                </tr>
                </thead>
                <tbody>
                {(elements !== undefined) ? elements.map((lesson, index) =>
                    <LessonItem item={lesson} key={index} />
                ) : <tr><td colSpan="20"><em>Помилка завантаження розкладу</em></td></tr>}
                </tbody>
            </table>
        </div>
    );
};

export default ScheduleTable;