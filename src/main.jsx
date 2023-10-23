import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {PublicClientApplication} from "@azure/msal-browser";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { MSALConfig } from "./utilities/MSALConfig";
import {MsalProvider} from "@azure/msal-react";

const client = new PublicClientApplication(MSALConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MsalProvider instance={client}>
        <App />
    </MsalProvider>
);

