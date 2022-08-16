import { useState, useEffect, useMemo, useContext, createContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Input, Card, Spin, Button, Tooltip, Row, Col } from "antd";
import { debounce } from "lodash";

import {
  SortAscendingOutlined,
  SortDescendingOutlined,
  AlignCenterOutlined,
} from "@ant-design/icons";

import QuotesList from "../QuotesList";

import { useFetchQuotes } from "../../hooks/useFetchQuotes";
import "./QuotesListContainer.less";
import SortByButton from "../SortByButton";
import { Quote } from "../../utils/types";
import { ASC, DESC, DEFAULT } from "../../utils/constants";

const { Search } = Input;
export const ListContext = createContext([]);

const QuotesListContainer = () => {
  const [fullList, setFullList] = useState([]);
  const [filteredList, setFilteredList] = useState<Quote[]>([]);
  const { data, isError, isLoading } = useFetchQuotes();
  const [isSortableBy, setIsSortableBy] = useState(DEFAULT);

  const navigate = useNavigate();

  useEffect(() => {
    setFullList(data);
    setFilteredList(data);
  }, [data]);

  const handleSetFilteredList = (newList: Quote[]) => {
    setFilteredList(newList);
  };

  const setIcon = (name: string) => {
    switch (name) {
      case ASC:
        return <SortDescendingOutlined />;
      case DESC:
        return <SortAscendingOutlined />;
      case DEFAULT:
        return <AlignCenterOutlined />;
      default:
        return <AlignCenterOutlined />;
    }
  };

  const sortByParam = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    param: keyof Quote
  ) => {
    if (filteredList) {
      const sortList = [...filteredList];
      if (!fullList.length) return;
      if (param.trim() === "") return;

      switch (isSortableBy) {
        case DEFAULT:
          sortList.sort((a: Quote, b: Quote) => (a[param] > b[param] ? 1 : -1));
          setIsSortableBy(ASC);
          handleSetFilteredList(sortList);
          break;

        case ASC:
          sortList.sort((a: Quote, b: Quote) => (b[param] > a[param] ? 1 : -1));
          setIsSortableBy(DESC);
          handleSetFilteredList(sortList);
          break;

        case DESC:
          handleSetFilteredList(fullList);
          setIsSortableBy(DEFAULT);
          break;

        default:
          handleSetFilteredList(fullList);
      }
    }
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

  //add state

  const handleClick = () => {
    navigate("/quote");
  };

  return (
    <ListContext.Provider value={fullList}>
      <div className="search-block">
        <h1>Search</h1>
        <div className="card-holder">
          <Card
            style={{
              width: 600,
              margin: "auto",
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Search
                  placeholder="Search quotes"
                  enterButton
                  onChange={debouncedChangeHandler}
                />
              </Col>
              <Col span={2}>
                <SortByButton
                    id="name"
                  setIcon={setIcon}
                  sortByParam={sortByParam}
                  isSortableBy={isSortableBy}
                 />
              </Col>
              <Col span={2}>
                <SortByButton
                    id="quotes"
                  setIcon={setIcon}
                  sortByParam={sortByParam}
                  isSortableBy={isSortableBy}
                 />
              </Col>
              <Col span={2}>
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
              <Col span={6}>
                <Link
                  className="ant-btn ant-btn-default"
                  to="quote"
                  onClick={handleClick}
                >
                  Go to quote
                </Link>
              </Col>
            </Row>
          </Card>
        </div>
        <QuotesList data={filteredList} />
      </div>
    </ListContext.Provider>
  );
};

export default QuotesListContainer;
