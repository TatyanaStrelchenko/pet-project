import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import { ListContext } from "../../App";
import { QuoteType } from "../../utils/types";

const Quotes = () => {
  const [quote, setQuote] = useState<QuoteType>();
  //const list = useContext(ListContext);

  //@ts-ignore
  const quotes = useSelector((state: RootState) => state.list.value)

  console.log({quotes})

  const getRandomQuote = async () => {
    const num = Math.floor(Math.random() * 10);
    const randomQuote = quotes.find((item:any, index:string) => item[index] === item[num]);
    if (randomQuote) {
      setQuote(randomQuote);
    }
  };

  useEffect(() => {
    getRandomQuote();

  }, []);

  return (
    <>
      <Link className="ant-btn ant-btn-primary" to="/">
        Back
      </Link>
      <h2>Quotes</h2>
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
