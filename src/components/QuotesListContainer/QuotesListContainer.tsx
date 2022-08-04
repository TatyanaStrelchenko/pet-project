import { useState, useEffect, useMemo } from "react";

import { Input, Card, Spin, Button, Tooltip, Row, Col } from "antd";
import { debounce } from "lodash";

import QuotesList from "../QuotesList";

import { useFetchQuotes } from "../../hooks/useFetchQuotes";
import "./QuotesListContainer.less";
import SortByButton from "../SortByButton";
import { Quote } from "../../utils/types";

const { Search } = Input;

const QuotesListContainer = () => {
  const [fullList, setFullList] = useState([]);
  const [filteredList, setFilteredList] = useState<Quote[]>([]);
  const { data, isError, isLoading } = useFetchQuotes();

  useEffect(() => {
    setFullList(data);
    setFilteredList(data);
  }, [data]);

  const handleSetFilteredList = (newList: Quote[]) => {
    setFilteredList(newList);
  };

  const debouncedChangeHandler = useMemo(
    () =>
      debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value.toLowerCase();
        if (event.target.value === "") {
          setFilteredList(fullList);
        } else {
          const filteredResult = data.filter(
            (item: Quote) =>
              new RegExp(searchWord).test(item.name.toLowerCase()) ||
              new RegExp(searchWord).test(item.quotes.toLowerCase())
          );
          setFilteredList(filteredResult);
        }
      }, 300),
    [data, fullList]
  );

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (isError) {
    return <>Error</>;
  }

  const handleDefaultState = () => {
    setFilteredList(fullList);
  };

  return (
    <div className="search-block">
      <h1>Search</h1>
      <div className="card-holder">
        <Card
          style={{
            width: 400,
            margin: "auto",
          }}
        >
          <Row gutter={[16, 16]}>
            <Col span={15}>
              <Search
                placeholder="Search quotes"
                enterButton
                onChange={debouncedChangeHandler}
              />
            </Col>
            <Col span={3}>
              <SortByButton
                list={filteredList}
                defaultList={fullList}
                id="name"
                handleSetFilteredList={handleSetFilteredList}
              />
            </Col>
            <Col span={3}>
              <SortByButton
                list={filteredList}
                defaultList={fullList}
                id="quotes"
                handleSetFilteredList={handleSetFilteredList}
              />
            </Col>
            <Col span={3}>
              <Tooltip title="Default">
                <Button
                  type="default"
                  shape="circle"
                  onClick={() => handleDefaultState()}
                  id="quote"
                >
                  def
                </Button>
              </Tooltip>
            </Col>
          </Row>
        </Card>
      </div>
      <QuotesList data={filteredList} />
    </div>
  );
};

export default QuotesListContainer;
