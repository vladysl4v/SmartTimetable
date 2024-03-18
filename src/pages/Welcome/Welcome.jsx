import './Welcome.css'
import {Link} from "react-router-dom";

export const Welcome = () => {
    return (
      <div className='local-container'>
        <h3 className='text-center'> <i className='fa fa-hand-peace'></i> Вітаємо!</h3>
        <h5 className='text-center mb-4'>Оберіть розклад для перегляду</h5>
          <div className='row justify-content-center' >
            <div className='col-xs-11 col-sm-11 col-md-5 col-lg-5 text-center mb-3' style={{height:170}}>
              <Link to={'/student'} className='btn btn-outline-light btn-lg border-3 w-100 h-100 d-flex align-items-center justify-content-between' >
                  <i className='fa fa-user-graduate fa-6x fa-gradient'></i>
                  <h1 className='ms-2'>Студент</h1>
                  <p></p>
              </Link>
            </div>
            <div className='col-xs-11 col-sm-11 col-md-5 col-lg-5 text-center mb-2' style={{height:170}}>
              <Link to={'/teacher'} className='btn btn-outline-light btn-lg border-3 w-100 h-100 d-flex align-items-center justify-content-between' >
                  <i className='fa fa-user-tie fa-6x fa-gradient'></i>
                  <h1 className='ms-2'>Викладач</h1>
                  <p></p>
              </Link>
            </div>
          </div>
        </div>
    )
}