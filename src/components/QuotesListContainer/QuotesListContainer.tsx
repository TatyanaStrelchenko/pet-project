import { useState, useEffect, useMemo } from "react";

import { Input, Card, Spin, Button, Tooltip, Row, Col } from "antd";
import { debounce } from "lodash";
import { SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons";

import QuotesList from "../QuotesList";

import { useFetchQuotes } from "../../hooks/useFetchQuotes";
import "./QuotesListContainer.less";

const { Search } = Input;

const QuotesListContainer = () => {
  const [fullList, setFullList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const { data, isError, isLoading } = useFetchQuotes();
  const [isSortable, setIsSortable] = useState(false);

  useEffect(() => {
    setFullList(data);
    setFilteredList(data);
  }, [data]);

  const debouncedChangeHandler = useMemo(
    () =>
      debounce((event: any) => {
        const searchWord = event.target.value.toLowerCase()
        if (event.target.value === "") {
          setFilteredList(fullList);
        } else {
          const filteredResult = data.filter(
            (item: any) =>
              new RegExp(searchWord).test(item.name.toLowerCase()) ||
              new RegExp(searchWord).test(item.quotes.toLowerCase())
          );
          setFilteredList(filteredResult);
        }
      }, 300),
    [data, fullList]
  );

  const sortByName = (props: string) => {
    console.log('props', props)
    if (!isSortable) {
      const sortList = [...filteredList].sort((a: any, b: any) => b.props > a.props ? 1 : -1)
      console.log('sortList1', sortList)
      setIsSortable(true);
      setFilteredList(sortList);
      return sortList
    } else {
      const sortList = [...filteredList].sort((a: any, b: any) => a.props > b.props ? 1 : -1)
      console.log('sortList2', sortList)
      setIsSortable(false);
      setFilteredList(sortList);
      return sortList
    }
  }

  const sortByQuote = () => {
    console.log('sort')
  }

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
                  icon={isSortable ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
                  onClick={() =>sortByName('name')}
                />
              </Tooltip>
            </Col>
            <Col span={3}>
              <Tooltip title="Sort by quote">
                <Button
                  type="default"
                  shape="circle"
                  icon={<SortAscendingOutlined />}
                  onClick={() =>sortByName('quotes')}
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
