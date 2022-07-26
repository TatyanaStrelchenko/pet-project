import React from "react";
import { List } from "antd";
import { Quote } from "../../utils/types";

const QuotesList = ({ data }: { data: Quote[] | undefined }) => (
  <List
    size="small"
    dataSource={data}
    bordered
    renderItem={(item: Quote) => (
      <List.Item>
        <h3>{item.name}</h3>
        <p>{item.quotes}</p>
      </List.Item>
    )}
  />
);

export default QuotesList;
