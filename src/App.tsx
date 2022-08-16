import React from "react";
import { Route, Routes } from "react-router-dom";

import Quote from "./pages/Quote";
import Home from "./pages/Home";

import "./App.less";

const App = () => (
  <div className="App">
    <div className="container">
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Quote />} path="/quote" />
        <Route element={<div>Not found</div>} path="*" />
      </Routes>
    </div>
  </div>
);

export default App;
