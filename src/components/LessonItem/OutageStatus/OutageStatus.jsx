import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import styles from './OutageStatus.module.css';
import noElectricity from '/media/no-electricity.png';
import maybeElectricity from '/media/maybe-electricity.png';
const showPopover = (outages) => (
    <Popover id="popover-basic">
        <Popover.Header as="h3">Відключення світла</Popover.Header>
        <Popover.Body>
            <div>
                {
                outages.map((outage, index) =>
                    <span key={index}>
                        <b>{outage.start.slice(0, 5)}-{outage.end.slice(0, 5)}</b> {(outage.isDefinite ? "Світла не буде" : "Можливе відключення")}<br/>
                    </span> )
                }
            </div>
        </Popover.Body>
    </Popover>
);
const OutageStatus = ({outages, ...props}) => {
    const anyDefiniteOutages = outages.some((outage) => outage.isDefinite)
    const outage_img = anyDefiniteOutages ? noElectricity : maybeElectricity
    const outage_alt = anyDefiniteOutages ? "Не буде" : "Можливо"
    return (
        <OverlayTrigger trigger="click" placement="top" overlay={ showPopover(outages) }>
            <td {...props}><a tabIndex="0"><input className={styles.outage} type="image" src={outage_img} alt={outage_alt}/></a></td>
        </OverlayTrigger>
    );
}

export default OutageStatus;