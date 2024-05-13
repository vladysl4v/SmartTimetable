import './LessonsInformation.css'
import {Button, Spinner} from "react-bootstrap";

export const LessonsInformation = ({item, changeModalMode, lessonDetails, type, isAuthorized, isCabinetExists}) => {
  const changeIfLoaded = (mode) => {
    if (lessonDetails != null) {
      changeModalMode(mode)
    }
  }
  
    return (
        <>
        <table className='text-center w-100'>
          <tbody>
          <tr>
            <td className="fw-bold">Час навчання</td>
            <td>{item.start.slice(0, 5)} - {item.end.slice(0, 5)}</td>
          </tr>
          {
            (item.outages != null) ?
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
            : null
          }
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
            <td>{item.cabinet} {(isCabinetExists) ? <span className='text-info user-select-none fw-bold cursor-pointer' onClick={() => changeModalMode('cabinet')}>[Це де?]</span> : null}</td>
          </tr>
          <tr>
            <td className="fw-bold">{(type === 'student') ? 'Викладач' : 'Група'}</td>
            <td>{(type === 'student') ? item.teacher : constructStudyGroups(item.studyGroups)}</td>
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
              (isAuthorized) ?
                <Button variant='outline-info fw-bold w-100 d-block table-row-cosplay' onClick={() => changeIfLoaded('notes')}>
                    Групові нотатки {lessonDetails != null ? `(${lessonDetails.notes.length})` : <Spinner animation='border' variant="info" size='sm'/>}
                    <i className="fa-solid fa-hand-pointer fa-lg ms-2"></i>
                </Button>
                : null
            }
            {
              (isAuthorized) ?
                <Button variant='outline-info fw-bold w-100 d-block table-row-cosplay mt-2' onClick={() => changeIfLoaded('meetings')}>
                  Онлайн-наради {lessonDetails != null ? `(${lessonDetails.meetings.length})` : <Spinner animation='border' variant="info"  size='sm'/>}
                  <i className="fa-solid fa-hand-pointer fa-lg ms-2"></i>
                </Button>
                : null
            }
        </>
    )
}

const constructStudyGroups = (studyGroups) => {
  return studyGroups?.map((group, index) => <span key={index}>{group}<br/></span>)
}