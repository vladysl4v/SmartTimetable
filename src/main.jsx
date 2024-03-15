import './main.css'
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

import ReactDOM from 'react-dom/client'
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {Navigation} from "./components/Navigation/Navigation.jsx";
import {PublicClientApplication} from "@azure/msal-browser";
import {MsalConfig} from "../msal.config.js";
import {MsalProvider} from "@azure/msal-react";
import {Settings} from "./pages/Settings/Settings.jsx";
import Schedule from "./pages/Schedule/Schedule.jsx";

// eslint-disable-next-line react-refresh/only-export-components
const AppRouter = () => {
    return (
        <HashRouter>
            <Navigation/>
            <Routes>
                <Route path="/" element={<Navigate to='/student-schedule' /> } />
                <Route path="/student-schedule" element={ <Schedule type='student' /> } />
                <Route path="/teacher-schedule" element={ <Schedule type='teacher' /> } />
                <Route path="/settings" element={ <Settings /> } />
            </Routes>
        </HashRouter>
    );
}
const client = new PublicClientApplication(MsalConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
        <MsalProvider instance={client}> 
            <AppRouter/>
        </MsalProvider>
)