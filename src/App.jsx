import {BrowserRouter, Route, Routes} from "react-router-dom";
import Schedule from "./pages/Schedule";
import Settings from "./pages/Settings";

import React from "react";

function App() {
    const todayDate = new Date();
      return (
        <BrowserRouter>
            <Routes>
                <Route path="/settings" element={ <Settings /> } />
                <Route path="/" element={ <Schedule date={todayDate} /> } />
            </Routes>
        </BrowserRouter>
      );
}
export default App;
