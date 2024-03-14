import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Lesson} from "../Lesson/Lesson.jsx";

export const ScheduleTable = ({isMobile, preferences, schedule, selectLesson, type}) => {
    return (
        <Table striped variant="dark" className='text-center align-middle' responsive>
          <thead>
          <tr>
            {
              (isMobile) ? (
                  <>
                    <th>Час</th>
                    <th>Дисципліна</th>
                    <th>Аудиторія</th>
                  </>
              ) : (
                  <>
                      {
                          (preferences.outageGroup?.value?.length)
                              ? <th>Світло</th> 
                              : null
                      }
                    <th>Час</th>
                    <th>Дисципліна</th>
                    <th>Тип заняття</th>
                    <th>Аудиторія</th>
                    <th>{(type === 'student') ? 'Викладач' : 'Група'}</th>
                  </>
              )
            }
          </tr>
          </thead>
          <tbody className="table-group-divider">
          {
              (() => {
                  if ((type === 'student' && !preferences.studyGroup) || (type === 'teacher' && !preferences.teacherId)) {
                      return (
                          <tr>
                            <td colSpan="20">
                              <em>
                              {
                                  (type === 'student') 
                                      ? "У Вас не налаштована навчальна група." 
                                      : "У Вас не налаштован викладач."}
                              <br/>
                                <Link to="/settings">Перейти до налаштувань</Link>
                              </em>
                            </td>
                          </tr>
                      )
                  }
                  else if (schedule === undefined) {
                      return <tr><td colSpan="20"><em>Помилка завантаження розкладу</em></td></tr>
                  }
                  else if (!schedule.length) {
                      return <tr><td colSpan="20"><em>На даний день розкладу не знайдено</em></td></tr>
                  }
                  else {
                      return schedule.map(
                          (lesson) => 
                              <Lesson key={lesson.id} lesson={lesson} isMobile={isMobile} onSelected={() => selectLesson(lesson)} preferences={preferences} type={type}/>
                      )
                  }
              })()
          }
          </tbody>
        </Table>
    )
}