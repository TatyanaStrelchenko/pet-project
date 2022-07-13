import React, { useState, useEffect, useCallback, useMemo } from "react";
// import useFetch from "react-fetch-hook";
import axios from "axios";

import { Input, Card } from "antd";
import { debounce } from "lodash";
import QuotesList from "../QuotesList";
import { Quote } from "../../utils/types";

import "./QuotesListContainer.less";
import { useFetchQuotes } from "../../hooks/useFetchQuotes";

const { Search } = Input;

const QuotesListContainer = () => {
  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false);

  const [data, setData] = useState([]);
  const [url, setUrl] = useState(
    "https://api.mockaroo.com/api/400c5b90?count=30&key=bee4ecb0"
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(url);

      setData(result.data);
    };

    fetchData();
  }, [url]);

  const handleChange = (event: any) => {
    setSearchField(event.target.value);

    //TODO - optimize
    if (event.target.value === "") {
      setSearchShow(false);
    } else {
      setSearchShow(true);
    }
  };

  const debouncedChangeHandler = useMemo(() => debounce(handleChange, 300), []);

  const searchQuotes = (params: string) => {
    if (data) {
      // console.log('data2', data.quotes)
      const filteredResult = data.filter(
        (item: any) =>
          new RegExp(params).test(item.name) ||
          new RegExp(params).test(item.quote)
      );

      if (searchShow) {
        return filteredResult.map((item) => <Card title={item}>{item}</Card>);
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
