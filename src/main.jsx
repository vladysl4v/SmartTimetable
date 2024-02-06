import './main.css'
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

import ReactDOM from 'react-dom/client'
import StudentSchedule from "./pages/StudentSchedule/StudentSchedule.jsx";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {Navigation} from "./components/Navigation/Navigation.jsx";
import {PublicClientApplication} from "@azure/msal-browser";
import {MSALConfig} from "./utils/MSALConfig.js";
import {MsalProvider} from "@azure/msal-react";
import {Settings} from "./pages/Settings/Settings.jsx";
import TeacherSchedule from "./pages/TeacherSchedule/TeacherSchedule.jsx";

// eslint-disable-next-line react-refresh/only-export-components
const AppRouter = () => {
    return (
        <HashRouter>
            <Navigation/>
            <Routes>
                <Route path="/" element={<Navigate to='/student-schedule' /> } />
                <Route path="/student-schedule" element={ <StudentSchedule /> } />
                <Route path="/teacher-schedule" element={ <TeacherSchedule /> } />
                <Route path="/settings" element={ <Settings /> } />
            </Routes>
        </HashRouter>
    );
}
const client = new PublicClientApplication(MSALConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
        <MsalProvider instance={client}> 
            <AppRouter/>
        </MsalProvider>
)