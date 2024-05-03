import './AddToHomescreenOffer.css'
import {useState} from "react";
export const AddToHomescreenOffer = () => {
    const appIcon = new URL('/favicon.svg', import.meta.url).href;
    const addToHomescreenClosed = window.localStorage.getItem('addToHomescreenClosed');

    const [isClosed, setIsClosed] = useState((addToHomescreenClosed ?? 'false') === 'true');
    const [isHidden, setIsHidden] = useState(true);

    if ((!navigator.userAgent.match(/iphone|android|blackberry/ig)) || isClosed) {
      return null;
    }
    return (
        <>
        <div className='sticky-bottom colored position-fixed d-block w-100 rounded-top-4 border-top border-2 border-white'>
          <div className='w-100 d-flex' style={{minHeight:70}}>
            <img src={appIcon} alt="icon" className='my-auto ms-4' style={{minHeight:45}}/>
            <div className='p-2 w-100 my-auto ms-2 fw-bold cursor-pointer' onClick={() => setIsHidden(!isHidden)}>
              Додати Смарт Розклад до головного екрану?
            </div>
            <div className='btn-close p-2 flex-shrink-1 my-auto me-4 cursor-pointer' onClick={() => closeForever(setIsClosed)}></div>
          </div>
          {
            !isHidden &&
              <div className='w-100'>
                <div className="mx-auto border-white border-top w-75 mx-3"></div>
                <div className='text-center mx-4 mt-3'>
                  <i className="fa-brands fa-google fa-xl"></i> Для того щоб додати сторінку на головний екран вашого пристрою,
                  натисніть на <i className='fa fa-ellipsis-vertical'></i> <strong>три крапки</strong> у
                  верхньому правому кутку та оберіть <strong>«Додати на головний екран»</strong>.
                </div>
                <br/>
                <div className='text-center mx-4'>
                  <i className="fa-brands fa-safari fa-xl"></i> Якщо ви використовуєте <strong>Safari</strong>,
                  Натисніть кнопку <i className="fa-solid fa-arrow-up-from-bracket"></i> <strong>«Поширити»</strong>,
                  а потім — панель меню.  Прокрутіть униз список опцій, а потім натисніть
                  <strong>«На Початковий екран»</strong>.
                </div>
                <br/>
                <div className='text-center mx-4'>
                  Якщо пункт <strong>«На Початковий екран»</strong> не відображається, ви можете його додати.
                  Прокрутіть униз списку, натисніть <strong>«Редагувати дії»</strong>
                  , а тоді натисніть <strong>«На Початковий екран»</strong>.
                </div>
                <div style={{height:30}}></div>
              </div>
          }
        </div>
        </>
    )
}

const closeForever = (setIsClosed) => {
    window.localStorage.setItem('addToHomescreenClosed', 'true');
    setIsClosed(true)
}