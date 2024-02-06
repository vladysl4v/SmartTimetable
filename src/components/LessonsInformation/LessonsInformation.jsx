import './LessonsInformation.css'
import {Button} from "react-bootstrap";

export const LessonsInformation = ({item, changeModalMode, type}) => {
    return (
        <>
        <table className='text-center w-100'>
          <tbody>
          <tr>
            <td className="fw-bold">Час навчання</td>
            <td>{item.start.slice(0, 5)} - {item.end.slice(0, 5)}</td>
          </tr>
          <tr>
            <td className="fw-bold">Світловідключення</td>
            <td>
              {
                item.outages?.map((outage, index) =>
                    <span key={index}>
                        <b>{outage.start.slice(0, 5)}-{outage.end.slice(0, 5)}</b> {(outage.isDefinite ? "Не буде" : "Можливе")}<br/>
                    </span>
                )}
            </td>
          </tr>
          <tr>
            <td className="fw-bold">Дисципліна</td>
            <td>{item.discipline}</td>
          </tr>
          <tr>
            <td className="fw-bold">Тип заняття</td>
            <td>{item.studyType}</td>
          </tr>
          <tr>
            <td className="fw-bold">Аудиторія</td>
            <td>{item.cabinet}</td>
          </tr>
          <tr>
            <td className="fw-bold">{(type === 'student') ? 'Викладач' : 'Група'}</td>
            <td>{(type === 'student') ? item.teacher : item.studyGroup}</td>
          </tr>
          {
            (item.subgroup?.length) ?
                <tr>
                  <td className="fw-bold">Підгрупа</td>
                  <td>{item.subgroup}</td>
                </tr>
                : null
          }
          </tbody>
        </table>
            {
                (item.notes != null) ?
                <Button variant='outline-info fw-bold w-100 d-block table-row-cosplay' onClick={() => changeModalMode('notes')}>
                    Групові нотатки ({item.notes.length})
                    <i className="fa-solid fa-hand-pointer fa-lg ms-2"></i>
                </Button>
                : null
            }
          {
            (item.meetings?.length) ?
                <Button variant='outline-info fw-bold w-100 d-block table-row-cosplay mt-2' onClick={() => changeModalMode('meetings')}>
                  Онлайн-наради ({item.meetings.length})
                  <i className="fa-solid fa-hand-pointer fa-lg ms-2"></i>
                </Button>
                : null
          }

        </>
    )
}