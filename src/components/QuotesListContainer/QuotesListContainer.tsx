import { useState, useEffect, useMemo, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Input, Card, Button, Tooltip, Row, Col } from "antd";
import { debounce, isEmpty } from "lodash";

import {
  SortAscendingOutlined,
  SortDescendingOutlined,
  AlignCenterOutlined,
} from "@ant-design/icons";
import { increment, updateList } from '../../store/listSlice'

import QuotesList from "../QuotesList";
import { ListContext } from "../../App";

import "./QuotesListContainer.less";
import SortByButton from "../SortByButton";
import { QuoteType } from "../../utils/types";
import { ASC, DESC, DEFAULT } from "../../utils/constants";

const { Search } = Input;

const QuotesListContainer = () => {
  const [fullList, setFullList] = useState([]);
  const [filteredList, setFilteredList] = useState<QuoteType[]>([]);
  const [isSortableByName, setIsSortableByName] = useState(DEFAULT);
  const [isSortableByQuotes, setIsSortableByQuotes] = useState(DEFAULT);

  const data = useContext(ListContext);

  const navigate = useNavigate();
  const dispatch = useDispatch()


  useEffect(() => {
    if (!isEmpty(data)) {
      setFullList(data);
      setFilteredList(data);
    }
  }, [data]);

  useEffect(() => {
    if (!isEmpty(data)) {
      //@ts-ignore
      dispatch(updateList(data))
    }
  }, [data, dispatch]);

  const getStorageParams = () => {
    if (sessionStorage.getItem("buttonName")) {
      const buttonName = sessionStorage.getItem("buttonName");
      if (buttonName) {
        setIsSortableByName(buttonName);
      }
    }
    if (sessionStorage.getItem("buttonQuotes")) {
      const buttonQuotes = sessionStorage.getItem("buttonQuotes");

      if (buttonQuotes) {
        setIsSortableByQuotes(buttonQuotes);
      }
    }
  };

  useEffect(() => {
    getStorageParams();
  }, [isSortableByName, isSortableByQuotes]);

  const sortByParam = (param: keyof QuoteType) => {
    if (filteredList) {
      const sortList = [...filteredList];

      if (!fullList.length) return;
      if (param.trim() === "") return;

      if (param === "name") {
        switch (isSortableByName) {
          case DEFAULT:
            sortList.sort((a: QuoteType, b: QuoteType) =>
              a[param] > b[param] ? 1 : -1
            );
            setIsSortableByName(ASC);
            sessionStorage.setItem("buttonName", ASC);
            setFilteredList(sortList);
            break;

          case ASC:
            sortList.sort((a: QuoteType, b: QuoteType) =>
              b[param] > a[param] ? 1 : -1
            );
            setIsSortableByName(DESC);
            sessionStorage.setItem("buttonName", DESC);
            setFilteredList(sortList);

            break;

          case DESC:
            setIsSortableByName(DEFAULT);
            sessionStorage.setItem("buttonName", DEFAULT);
            setFilteredList(fullList);

            break;

          default:
            setIsSortableByName(DEFAULT);
        }
      }

      if (param === "quotes") {
        switch (isSortableByQuotes) {
          case DEFAULT:
            sortList.sort((a: QuoteType, b: QuoteType) =>
              a[param] > b[param] ? 1 : -1
            );
            setIsSortableByQuotes(ASC);
            sessionStorage.setItem("buttonQuotes", ASC);
            setFilteredList(sortList);
            break;

          case ASC:
            sortList.sort((a: QuoteType, b: QuoteType) =>
              b[param] > a[param] ? 1 : -1
            );
            setIsSortableByQuotes(DESC);
            sessionStorage.setItem("buttonQuotes", DESC);
            setFilteredList(sortList);
            break;

          case DESC:
            setIsSortableByQuotes(DEFAULT);
            sessionStorage.setItem("buttonQuotes", DEFAULT);
            setFilteredList(fullList);
            break;

          default:
            setIsSortableByQuotes(DEFAULT);
        }
      }
    }
  };

  // useEffect(() => {
  //   sortByParam("name");
  //   sortByParam("quotes")
  // }, []);

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

  const debouncedChangeHandler = useMemo(
    () =>
      debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value.toLowerCase();
        if (event.target.value === "") {
          setFilteredList(fullList);
        } else {
          const filteredResult = data.filter(
            (item: QuoteType) =>
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

  const state = { filteredList };

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
                state={state}
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
