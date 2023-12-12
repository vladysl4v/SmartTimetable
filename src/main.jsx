import './main.css'
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

import ReactDOM from 'react-dom/client'
import Schedule from "./pages/Schedule/Schedule.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Navigation} from "./components/Navigation/Navigation.jsx";
import {PublicClientApplication} from "@azure/msal-browser";
import {MSALConfig} from "./utils/MSALConfig.js";
import {MsalProvider} from "@azure/msal-react";
import {Settings} from "./pages/Settings/Settings.jsx";


// eslint-disable-next-line react-refresh/only-export-components
const AppRouter = () =>{
    return (
        <BrowserRouter>
            <Navigation/>
            <Routes>
                <Route path="/" element={ <Schedule /> } />
                <Route path="/settings" element={ <Settings /> } />
            </Routes>
        </BrowserRouter>
    );
}
const client = new PublicClientApplication(MSALConfig);
await client.initialize();

ReactDOM.createRoot(document.getElementById('root')).render(
        <MsalProvider instance={client}> 
            <AppRouter/>
        </MsalProvider>
)