import React from 'react';
import LessonItem from "../LessonItem/LessonItem.jsx";
import useIsMobile from "../../hooks/useIsMobile.js"
import {useCookies} from "react-cookie";
import {Link} from "react-router-dom";

const ScheduleTable = ({elements, isLoading, msalClient, ...props}) => {
    const [cookies] = useCookies(['studyGroup', 'outageGroup'])
    const isMobile = useIsMobile()
    return (
        <div style={{marginTop: '20px'}} {...props}>
            <table className="table text-center" style={{verticalAlign: 'middle'}}>
                <thead>
                <tr>
                    {(isMobile)
                        ? (<>
                            <th>Час навчання</th>
                            <th>Дисципліна</th>
                            <th>Аудиторія</th>
                        </>)
                        : (<>
                            {
                                (cookies.outageGroup)
                                ? <th>Світло</th>
                                : null
                            }
                            <th>Час навчання</th>
                            <th>Дисципліна</th>
                            <th>Тип заняття</th>
                            <th>Аудиторія</th>
                            <th>Викладач</th>
                        </>)}
                </tr>
                </thead>
                <tbody className="table-group-divider">
                {
                    (!cookies.studyGroup)
                    ? <tr><td colSpan="20"><em>У Вас не налаштована навчальна група. <Link to="/settings">Перейти до налаштувань</Link></em></td></tr>
                    : (elements === undefined)
                    ? <tr><td colSpan="20"><em>Помилка завантаження розкладу</em></td></tr>
                    : (!elements.length)
                    ? <tr><td colSpan="20"><em>На даний час розкладу не знайдено</em></td></tr>
                    :  elements.map((lesson) => <LessonItem item={lesson} isMobile={isMobile} key={lesson.id} showOutages={cookies.outageGroup} msalClient={msalClient}/>)
                }
                </tbody>
            </table>
        </div>
    );
};

export default ScheduleTable;