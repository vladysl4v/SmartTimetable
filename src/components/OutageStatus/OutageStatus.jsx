import './OutageStatus.css'
import {OverlayTrigger, Popover} from "react-bootstrap";
import noElectricity from '../../assets/no-electricity-dark.png';
import maybeElectricity from '../../assets/maybe-electricity-dark.png';
const showPopover = (outages) => (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Відключення світла</Popover.Header>
      <Popover.Body>
        <div>
          {
            outages.map((outage, index) =>
                <span key={index}>
                   <b>{outage.start.slice(0, 5)}-{outage.end.slice(0, 5)}</b> {(outage.isDefinite ? "Світла не буде" : "Можливе відключення")}<br/>
                </span> 
            )
          }
        </div>
      </Popover.Body>
    </Popover>
);
export const OutageStatus = ({outages}) => {
  const anyDefiniteOutages = outages.some((outage) => outage.isDefinite)
  const outageImg = anyDefiniteOutages ? noElectricity : maybeElectricity
  const outageAlt = anyDefiniteOutages ? "Не буде" : "Можливо"
  return (
      <OverlayTrigger placement={window.innerWidth < 1650 ? 'right' : 'left'} overlay={showPopover(outages)}>
        <td className='user-select-none'>
            <a tabIndex="0">
                <input className='outage' type="image" src={outageImg} alt={outageAlt}/>
            </a>
        </td>
      </OverlayTrigger>
  );
}