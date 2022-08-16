import { Card, Col, List, Row, Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QuotesList from "../../components/QuotesList";
import { ListContext } from "../../components/QuotesListContainer/QuotesListContainer";
import { useFetchQuotes } from "../../hooks/useFetchQuotes";
import { Quote } from "../../utils/types";

const Quotes = () => {
  const [quote, setQuote] = useState<Quote>();
  // const { data, isError, isLoading } = useFetchQuotes();
  const list = useContext(ListContext);

  console.log("list", list);

  const getRandomQuote = async () => {
    const num = Math.floor(Math.random() * 10);
    const randomQuote = list.find((item, index) => item[index] === item[num]);
    if (randomQuote) {
      setQuote(randomQuote);
    }
  };

  console.log(`History.state before pushState: ${history.state}`);

  useEffect(() => {
    // getRandomQuote();
  }, []);

  return (
    <>
      <Link className="ant-btn ant-btn-primary" to="/">
        Back
      </Link>
      <h2>Quotes</h2>
      {list}
      {quote ? (
        <>
          <h2>{quote.name}</h2>
          <p>{quote.quotes}</p>
        </>
      ) : (
        <Spin />
      )}
    </>
  );
};

export default Quotes;