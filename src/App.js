import {useEffect, useState} from "react";
import ScheduleBar from "./components/ScheduleBar";
import ScheduleButtons from "./components/ScheduleButtons";
import RequestService from "./utilities/RequestService";
import ScheduleTable from "./components/ScheduleTable";

const todayDate = new Date();

 function App() {
     async function fetchSchedule() {
         setIsScheduleLoading(true)
         const response = await RequestService.getSchedule(displayDate)
         setIsScheduleLoading(false)
         setLessons(response)
     }
     const [isScheduleLoading, setIsScheduleLoading] = useState(false)
     const [displayDate, setDisplayDate] = useState(todayDate)
     const [lessons, setLessons] = useState([])

     useEffect(() => { fetchSchedule() }, [displayDate])

      return (
        <div className="App">
            <ScheduleBar displayDate={displayDate} isLoading={isScheduleLoading}  />
            <ScheduleButtons displayDate={todayDate} setDisplayDate={setDisplayDate} />
            <ScheduleTable elements={lessons}/>
        </div>
      );
}

export default App;
