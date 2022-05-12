import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Routers/Routers";

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
