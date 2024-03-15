import {Table} from "react-bootstrap";
import {Lesson} from "../Lesson/Lesson.jsx";
import Button from "react-bootstrap/Button";

export const ScheduleTable = ({configuration, schedule, selectLesson, type, configureGroup}) => {
    return (
        <Table striped variant="dark" className='text-center align-middle' responsive>
          <thead>
          <tr>
            {
              (configuration.isMobile) ? (
                  <>
                    <th>Час</th>
                    <th>Дисципліна</th>
                    <th>Аудиторія</th>
                  </>
              ) : (
                  <>
                      {
                          (configuration.isOutagesAllowed())
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
                  if ((type === 'student' && !configuration.localStorage.studyGroup?.key) ||
                      (type === 'teacher' && !configuration.localStorage.teacherId?.key)) {
                      return (
                          <tr>
                            <td colSpan="20">
                              <em>
                                  У Вас не{type === 'student' ? ' налаштовано групу.' : ' налаштован викладач.'}
                                  <br/>
                                  <Button variant="outline-light" className='my-3' onClick={configureGroup}>Налаштувати</Button>
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
                          (lesson, index) => 
                              <Lesson key={`${lesson.id}${index}`} lesson={lesson} configuration={configuration} onSelected={() => selectLesson(lesson)} type={type}/>
                      )
                  }
              })()
          }
          </tbody>
        </Table>
    )
}