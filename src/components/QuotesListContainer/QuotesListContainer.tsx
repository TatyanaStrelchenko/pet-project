import React, { useState, useEffect, useCallback, useMemo } from "react";
// import useFetch from "react-fetch-hook";
// import axios from "axios";

import { Input, Card } from "antd";
import { debounce } from "lodash";
import QuotesList from "../QuotesList";
import { Quote } from "../../utils/types";

import { useFetchQuotes } from "../../hooks/useFetchQuotes";
import "./QuotesListContainer.less";
import { getQuotes } from "../../services/quotes-service";

const { Search } = Input;

const QuotesListContainer = () => {
  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false);
  // const [data, setData] = useFetchQuotes();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      //getQuotes
      const result = await getQuotes();
      setData(result);
      console.log("result", result);
    };

    fetchData();
  }, []);

  const handleChange = (event: any) => {
    setSearchField(event.target.value);
    setSearchShow(!(event.target.value === ""));
  };

  const debouncedChangeHandler = useMemo(() => debounce(handleChange, 100), []);

  const searchQuotes = (params: string) => {
    if (data) {
      const filteredResult = data.filter(
        (item: any) =>
          new RegExp(params).test(item.name) ||
          new RegExp(params).test(item.quote)
      );

      if (searchShow) {
        return filteredResult.map((item: Quote) => (
          <Card title={item.name}>{item.quote}</Card>
        ));
      }
    }
  };

  return (
    <div className="search-block">
      <h1>Search</h1>
      <div className="card-holder">
        <Card
          style={{
            width: 300,
            margin: "auto",
          }}
        >
          <Search
            placeholder="Search quotes"
            enterButton
            onChange={debouncedChangeHandler}
          />
        </Card>
      </div>
      <div className="search-results">{searchQuotes(searchField)}</div>
      <QuotesList data={data} />
    </div>
  );
};

export default QuotesListContainer;
