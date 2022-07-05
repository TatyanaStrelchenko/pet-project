import React from "react";
import "./App.less";
import QuotesListContainer from "./components/QuotesListContainer/QuotesListContainer";

const App = () => (
  <div className="App">
    <div className="container">
      <QuotesListContainer />
    </div>
  </div>
);

export default App;
