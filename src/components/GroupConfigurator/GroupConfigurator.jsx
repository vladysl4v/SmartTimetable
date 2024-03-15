import {TeacherFiltersSection} from "../TeacherFiltersSection/TeacherFiltersSection.jsx";
import Button from "react-bootstrap/Button";
import {StudentFiltersSection} from "../StudentFiltersSection/StudentFiltersSection.jsx";
import {MainContainer} from "../../layout/MainContainer/MainContainer.jsx";

export const GroupConfigurator = ({scheduleMode, backToSchedule, configuration, type}) => {
  if (scheduleMode === 'schedule') {
    return null;
  }
  if (type === 'student') {
    return (
        <MainContainer>
          <div className='mx-auto px-4 text-center' style={{maxWidth:700}}>
            <StudentFiltersSection defaultValues={configuration.localStorage} setValue={configuration.addToStorage}/>
            <Button variant="light" className='my-3' onClick={backToSchedule}>Закрити налаштування</Button>
          </div>
        </MainContainer>
    )
    }
    if (type === 'teacher') {
      return (
          <MainContainer>
            <div className='mx-auto px-4 text-center' style={{maxWidth:700}}>
              <TeacherFiltersSection defaultValues={configuration.localStorage} setValue={configuration.addToStorage}/>
              <Button variant="light" className='my-3' onClick={backToSchedule}>Закрити налаштування</Button>
            </div>
          </MainContainer>
      )
  }
}