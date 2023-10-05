import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const OutageStatus = ({outages}) => {
    const getPopover = () => (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Відключення світла</Popover.Header>
            <Popover.Body>
                <div>
                    {outages.map((outage, index) =>
                        <span key={index}><b>{outage.start.slice(0, 5)}-{outage.end.slice(0, 5)}</b> {(outage.isDefinite ? "Світла не буде" : "Можливе відключення")}<br/></span> )}
                </div>
            </Popover.Body>
        </Popover>
    );
    const outage_img = outages.some((outage) => outage.isDefinite)
        ? process.env.PUBLIC_URL + "/media/no-electricity.png"
        : process.env.PUBLIC_URL + "/media/maybe-electricity.png"

    return (
        <OverlayTrigger trigger="click" placement="top" overlay={getPopover()}>
            <td><a tabIndex="0"><input style={{width:'20px', height: '20px', verticalAlign: 'middle'}} type="image" src={outage_img} alt=""/></a></td>
        </OverlayTrigger>
    );
}

export default OutageStatus;