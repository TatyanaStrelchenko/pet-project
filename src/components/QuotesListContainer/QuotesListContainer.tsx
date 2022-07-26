import { useState, useEffect, useMemo } from "react";

import { Input, Card, Spin, Button, Tooltip, Row, Col } from "antd";
import { debounce } from "lodash";
import { SortAscendingOutlined } from "@ant-design/icons";

import QuotesList from "../QuotesList";

import { useFetchQuotes } from "../../hooks/useFetchQuotes";
import "./QuotesListContainer.less";

const { Search } = Input;

const QuotesListContainer = () => {
  const [fullList, setFullList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const { data, isError, isLoading } = useFetchQuotes();

  useEffect(() => {
    setFullList(data);
    setFilteredList(data);
  }, [data]);

  const debouncedChangeHandler = useMemo(
    () =>
      debounce((event: any) => {
        if (event.target.value === "") {
          setFilteredList(fullList);
        } else {
          const filteredResult = data.filter(
            (item: any) =>
              new RegExp(event.target.value).test(item.name) ||
              new RegExp(event.target.value).test(item.quotes)
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
            <Col span={18}>
              <Search
                placeholder="Search quotes"
                enterButton
                onChange={debouncedChangeHandler}
              />
            </Col>
            <Col span={3}>
              <Tooltip title="Sort by name">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<SortAscendingOutlined />}
                />
              </Tooltip>
            </Col>
            <Col span={3}>
              <Tooltip title="Sort by quote">
                <Button
                  type="default"
                  shape="circle"
                  icon={<SortAscendingOutlined />}
                />
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
