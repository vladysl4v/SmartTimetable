import {BrowserRouter, Route, Routes} from "react-router-dom";
import Schedule from "./pages/Schedule";
import Settings from "./pages/Settings";

import React from "react";

function App() {
      return (
        <BrowserRouter>
            <Routes>
                <Route path="/settings" element={ <Settings /> } />
                <Route path="/" element={ <Schedule /> } />
            </Routes>
        </BrowserRouter>
      );
}
export default App;
