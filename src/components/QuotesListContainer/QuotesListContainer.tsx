import { useState, useEffect, useMemo } from "react";

import { Input, Card, Spin, Button, Tooltip, Row, Col } from "antd";
import { debounce } from "lodash";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";

import QuotesList from "../QuotesList";

import { useFetchQuotes } from "../../hooks/useFetchQuotes";
import "./QuotesListContainer.less";

const { Search } = Input;

const QuotesListContainer = () => {
  const [fullList, setFullList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const { data, isError, isLoading } = useFetchQuotes();
  const [isSortableBy, setIsSortableBy] = useState(false);

  useEffect(() => {
    setFullList(data);
    setFilteredList(data);
  }, [data]);

  const debouncedChangeHandler = useMemo(
    () =>
      debounce((event: any) => {
        const searchWord = event.target.value.toLowerCase();
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

  const sortBy = (param: string) => {
    const list = filteredList;
    if(!list.length) return
    if (param.trim() === '') return
    
    if (!isSortableBy) {
      const sortList = [...list].sort((a: any, b: any) =>
        b[param] > a[param] ? 1 : -1
      );
      setIsSortableBy(true);
      console.log('sortList', sortList)
      setFilteredList(sortList);
    } else {
      const sortList = [...list].sort((a: any, b: any) =>
        a[param] > b[param] ? 1 : -1
      );
      setIsSortableBy(false);
      setFilteredList(sortList);
      console.log('sortList2', sortList)
    }

  };

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
                  icon={
                    isSortableBy ? (
                      <SortAscendingOutlined />
                    ) : (
                      <SortDescendingOutlined />
                    )
                  }
                  onClick={() => sortBy("name")}
                />
              </Tooltip>
            </Col>
            <Col span={3}>
              <Tooltip title="Sort by quote">
                <Button
                  type="default"
                  shape="circle"
                  icon={isSortableBy ? (
                    <SortAscendingOutlined />
                  ) : (
                    <SortDescendingOutlined />
                  )}
                  onClick={() => sortBy("quotes")}
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
