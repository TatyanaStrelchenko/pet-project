import { List } from "antd";
import { QuoteType } from "../../utils/types";

const QuotesList = ({ data }: { data: QuoteType[] | undefined }) => (
  <List
    size="small"
    dataSource={data}
    bordered
    renderItem={(item: QuoteType) => (
      <List.Item>
        <h3>{item.name}</h3>
        <p>{item.quotes}</p>
      </List.Item>
    )}
  />
);

export default QuotesList;
