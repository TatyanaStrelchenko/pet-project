import { useState, useEffect, useMemo, useRef } from "react";

import { Input, Card, Spin, Button, Tooltip, Row, Col } from "antd";
import { debounce } from "lodash";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
  AlignCenterOutlined
} from "@ant-design/icons";

import QuotesList from "../QuotesList";

import { useFetchQuotes } from "../../hooks/useFetchQuotes";
import "./QuotesListContainer.less";
import SortByButton from "../SortByButton";

const { Search } = Input;

const QuotesListContainer = () => {
  const [fullList, setFullList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const { data, isError, isLoading } = useFetchQuotes();
  const [isSortableBy, setIsSortableBy] = useState('asc');
  const [buttonName, setbuttonName] = useState("");

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

  const setIcon = (name: string) => {

    switch (name) {
      case 'asc': 
        return <SortDescendingOutlined />
      case 'desc': 
        return <SortAscendingOutlined />
      case 'def':
        return <AlignCenterOutlined />
      default:
        return <SortAscendingOutlined />
    }
  }

  const sortBy = (e: any, param: string) => {
    setbuttonName(e.currentTarget.id);
    const list = [...filteredList];
    if (!list.length) return;
    if (param.trim() === "") return;

    switch(isSortableBy) {
      case 'asc': 
        list.sort((a: any, b: any) => (a[param] > b[param] ? 1 : -1));

        setIsSortableBy('desc');
        console.log('asc', isSortableBy)
        setFilteredList(list);
        setIcon('desc')


        //setIcon('desc')
        break;
      
      case 'desc':
        list.sort((a: any, b: any) => (b[param] > a[param] ? 1 : -1));
        setIsSortableBy('def');
        setIcon('asc')

        console.log('desc', isSortableBy)
        setFilteredList(list);


        //setIcon('def')
        break;
      
      case 'def':  
        setFilteredList(fullList);
        setIsSortableBy('asc');
        setIcon('def')

        // console.log('fullList', fullList)
        // console.log('filteredList', filteredList)
        console.log('def', data)


          //('asc')
          break;
      
      default:
        setFilteredList(fullList);
        setIcon('asc')
    }

    // if (!isSortableBy) {
    //   list.sort((a: any, b: any) => (b[param] > a[param] ? 1 : -1));
    //   setIsSortableBy(true);
    // } else {
    //   list.sort((a: any, b: any) => (a[param] > b[param] ? 1 : -1));
    //   setIsSortableBy(false);
    // }
    // setFilteredList(list);
  };

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
              
              {filteredList.length ? <SortByButton
                list={filteredList}
                id="name"
              /> : null}
              {/* <Tooltip title="Sort by name">
                <Button
                  type="default"
                  shape="circle"
                  id="name"
                  icon={setIcon(isSortableBy)}
                  onClick={(e) => sortBy(e, "name")}
                />
              </Tooltip> */}
            </Col>
            <Col span={3}>
              {/* <Tooltip title="Sort by quote">
                <Button
                  type="default"
                  shape="circle"
                  id="quote"
                    icon={setIcon(isSortableBy)}
                  onClick={(e) => sortBy(e, "quotes")}
                />
              </Tooltip> */}
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
