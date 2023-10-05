import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {PublicClientApplication} from "@azure/msal-browser";
import { MSALConfig } from "./utilities/MSALConfig";
import {MsalProvider} from "@azure/msal-react";

const client = new PublicClientApplication(MSALConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MsalProvider instance={client}>
        <App />
    </MsalProvider>
);

