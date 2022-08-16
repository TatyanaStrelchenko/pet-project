import { useState, useEffect, useMemo, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Input, Card, Spin, Button, Tooltip, Row, Col } from "antd";
import { debounce } from "lodash";

import {
  SortAscendingOutlined,
  SortDescendingOutlined,
  AlignCenterOutlined,
} from "@ant-design/icons";

import QuotesList from "../QuotesList";
import { ListContext } from "../../App";

import "./QuotesListContainer.less";
import SortByButton from "../SortByButton";
import { Quote } from "../../utils/types";
import { ASC, DESC, DEFAULT } from "../../utils/constants";

const { Search } = Input;

const QuotesListContainer = () => {
  const [fullList, setFullList] = useState([]);
  const [filteredList, setFilteredList] = useState<Quote[]>([]);
  const [isSortableBy, setIsSortableBy] = useState(DEFAULT);
  const [isSortableByName, setIsSortableByName] = useState(DEFAULT);
  const [isSortableByQuotes, setIsSortableByQuotes] = useState(DEFAULT);

  const data = useContext(ListContext);

  const navigate = useNavigate();

  useEffect(() => {
    setFullList(data);
    setFilteredList(data);
  }, [data]);

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
          if (e.currentTarget.id === "name") {
            setIsSortableByName(ASC);
          } else {
            setIsSortableByQuotes(ASC);
          }
          setIsSortableBy(ASC);
          setFilteredList(sortList);
          break;

        case ASC:
          sortList.sort((a: Quote, b: Quote) => (b[param] > a[param] ? 1 : -1));
          if (e.currentTarget.id === "name") {
            setIsSortableByName(DESC);
          } else {
            setIsSortableByQuotes(DESC);
          }
          setIsSortableBy(DESC);
          setFilteredList(sortList);
          break;

        case DESC:
          if (e.currentTarget.id === "name") {
            setIsSortableByName(DEFAULT);
          } else {
            setIsSortableByQuotes(DEFAULT);
          }
          setIsSortableBy(DEFAULT);
          setFilteredList(fullList);
          break;

        default:
          setFilteredList(fullList);
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

  const handleDefaultState = () => {
    setFilteredList(fullList);
  };

  //add state

  const handleClick = () => {
    navigate("/quote");
  };

  return (
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
                isSortableBy={isSortableByName}
              />
            </Col>
            <Col span={2}>
              <SortByButton
                id="quotes"
                setIcon={setIcon}
                sortByParam={sortByParam}
                isSortableBy={isSortableByQuotes}
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
  );
};

export default QuotesListContainer;
