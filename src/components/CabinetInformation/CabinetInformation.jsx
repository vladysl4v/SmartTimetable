import './CabinetInformation.css'
import {useEffect, useState} from "react";
import {getAccessToken, getCabinetPathBlob} from "../../utils/Requests.js";
import {Spinner} from "react-bootstrap";

export const CabinetInformation = ({cabinet, configuration}) => {
    const [imageSrc, setImageSrc] = useState(null);
    useEffect(() => {
        setCabinetPath(cabinet, configuration, setImageSrc);
    }, [cabinet, configuration]);
    
    return (
        <div className='text-center'>
            {imageSrc !== null ? <img src={imageSrc} alt={`Path to cab ${cabinet}`} className='rounded-3' style={{maxWidth:'100%'}}/>
            : <Spinner className='mx-center' animation='border' variant="info" size='sm'/>}
            <p className='fst-italic mt-3'>Шлях до кабінету {cabinet}
                <br/>
            {cabinet[0] === '0' ? 'Кабінет знаходиться у підвалі' : `Кабінет знаходиться на ${cabinet[0]} поверсі`}</p>
        </div>
    )
}

const setCabinetPath = async (cabinet, configuration, setImageSrc) => {
    const accessToken = await getAccessToken(configuration.msalClient, configuration.account);
    const response = await getCabinetPathBlob(cabinet, accessToken);
    setImageSrc(URL.createObjectURL(response.data));
}