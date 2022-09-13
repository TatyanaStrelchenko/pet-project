import React, { createContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Spin } from "antd";

import { useFetchQuotes } from "./hooks/useFetchQuotes";

import Quotes from "./pages/Quotes";
import Home from "./pages/Home";

import "./App.less";

export const ListContext = createContext([]);

const App = () => {
  const { data, isError, isLoading } = useFetchQuotes();

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (isError) {
    return <>Error</>;
  }

  return (
    <ListContext.Provider value={data}>
      <div className="App">
        <div className="container">
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Quotes />} path="/quote" />
            <Route element={<div>Not found</div>} path="*" />
          </Routes>
        </div>
      </div>
    </ListContext.Provider>
  );
};

export default App;
