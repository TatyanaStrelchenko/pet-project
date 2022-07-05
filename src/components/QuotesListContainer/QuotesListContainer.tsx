import React, { useState, useEffect, useCallback, useMemo, TimeHTMLAttributes } from "react";
import useFetch from "react-fetch-hook";
import { Input, Card } from "antd";
import { debounce } from 'lodash';
import QuotesList from "../QuotesList";
import { Quote } from "../../utils/types";


import "./QuotesListContainer.less";

const { Search } = Input;

const QuotesListContainer = () => {
  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false);

  const { data } = useFetch<Quote[] | undefined>(
    "https://api.mockaroo.com/api/cf939070?count=1000&key=29f59060"
  );

  const updateQuery = () => {
    searchQuotes(searchField)
};

  const delayedQuery = useCallback(debounce(updateQuery, 500), [searchField]);
  
  const handleChange = (event: any) => {
    setSearchField(event.target.value);

    if (event.target.value === "") {
      setSearchShow(false);
    } else {
      setSearchShow(true);
    }
  };

  const searchQuotes = (query: string) => {
    if (data) {
      const filteredResult = data.filter(
        (item) =>
          new RegExp(query).test(item.name) ||
          new RegExp(query).test(item.quote)
      );

      if (searchShow) {
        return filteredResult.map((item) => (
          <Card title={item.name}>{item.quote}</Card>
        ));
      }
    }
  };

  useEffect(() => {
    delayedQuery();
 
    // Cancel previous debounce calls during useEffect cleanup.
    return delayedQuery.cancel;
 }, [searchField, delayedQuery]);

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
            onChange={handleChange}
            value={searchField}
          />
        </Card>
      </div>
      <div className="search-results">
        {searchQuotes(searchField)}
      </div>
      <QuotesList data={data} />
    </div>
  );
};

export default QuotesListContainer;
