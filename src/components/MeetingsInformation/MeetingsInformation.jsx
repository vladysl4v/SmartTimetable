import {Hint} from "../../layout/Hint/Hint.jsx";

export const MeetingsInformation = ({item}) => {
    return (
        <>
          <Hint>
            Тут відібражаються Ваші заплановані онлайн-наради на цей час у Microsoft Teams
          </Hint>
        <table className="table text-center align-middle">
          <thead>
          <tr className="fw-bold">
            <td>Час</td>
            <td>Назва</td>
            <td>Посилання</td>
          </tr>
          </thead>
          <tbody>
          {
            (item.meetings.length) ?
                item.meetings.map((meeting, index) =>
                    <tr key={index}>
                      <td>{meeting.start.slice(0, 5)}-{meeting.end.slice(0, 5)}</td>
                      <td>{meeting.title}</td>
                      <td><a href={meeting.link}>Перейти на нараду</a></td>
                    </tr>
                ) : <tr><td colSpan="20"><em>Онлайн-нарад не знайдено</em></td></tr>
          }
          </tbody>
        </table>
        </>
    )
}