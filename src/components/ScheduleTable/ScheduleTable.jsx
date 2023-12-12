import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Lesson} from "../Lesson/Lesson.jsx";

export const ScheduleTable = ({isMobile, selectedGroup, schedule, selectLesson}) => {
    return (
        <Table striped variant="dark" className='text-center align-middle' responsive>
          <thead>
          <tr>
            {
              (isMobile) ? (
                  <>
                    <th>Час навчання</th>
                    <th>Дисципліна</th>
                    <th>Аудиторія</th>
                  </>
              ) : (
                  <>
                    <th>Світло</th>
                    <th>Час навчання</th>
                    <th>Дисципліна</th>
                    <th>Тип заняття</th>
                    <th>Аудиторія</th>
                    <th>Викладач</th>
                  </>
              )
            }
          </tr>
          </thead>
          <tbody className="table-group-divider">
          {
            (!selectedGroup)
                ? <tr><td colSpan="20"><em>У Вас не налаштована навчальна група.<br/>
                  <Link to="/settings">Перейти до налаштувань</Link></em></td></tr>
                : (schedule === undefined)
                    ? <tr><td colSpan="20"><em>Помилка завантаження розкладу</em></td></tr>
                    : (!schedule.length)
                        ? <tr><td colSpan="20"><em>На даний день розкладу не знайдено</em></td></tr>
                        :  schedule.map((lesson) => <Lesson key={lesson.id} lesson={lesson} isMobile={isMobile} onSelected={() => selectLesson(lesson)}/>)
          }
          </tbody>
        </Table>
    )
}