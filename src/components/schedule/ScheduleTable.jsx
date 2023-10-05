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
                <tbody className="table-group-divider">
                {
                    (function() {
                        if (elements === undefined) {
                            return <tr><td colSpan="20"><em>Помилка завантаження розкладу</em></td></tr>
                        }
                        else if (!elements.length) {
                            return <tr><td colSpan="20"><em>На даний час розкладу не знайдено</em></td></tr>
                        }
                        else {
                            return elements.map((lesson) => <LessonItem item={lesson} key={lesson.id} /> )
                        }
                    })()
                }
                </tbody>
            </table>
        </div>
    );
};

export default ScheduleTable;