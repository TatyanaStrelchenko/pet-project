import { Button, Tooltip } from "antd";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
  AlignCenterOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Quote } from "../../utils/types";
import { ASC, DESC, DEFAULT } from "../../utils/constants";

const SortByButton = ({
  list,
  defaultList,
  handleSetFilteredList,
  id,
}: {
  list: Quote[];
  defaultList: Quote[];
  handleSetFilteredList: Function;
  id: keyof Quote;
}) => {
  const [isSortableBy, setIsSortableBy] = useState(DEFAULT);

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
    if (list) {
      const sortList = [...list];
      if (!defaultList.length) return;
      if (param.trim() === "") return;

      switch (isSortableBy) {
        case DEFAULT:
          sortList.sort((a: Quote, b: Quote) => (a[param] > b[param] ? 1 : -1));
          setIsSortableBy(ASC);
          handleSetFilteredList(sortList);
          break;

        case ASC:
          sortList.sort((a: any, b: any) => (b[param] > a[param] ? 1 : -1));
          setIsSortableBy(DESC);
          handleSetFilteredList(sortList);
          break;

        case DESC:
          handleSetFilteredList(defaultList);
          setIsSortableBy(DEFAULT);
          break;

        default:
          handleSetFilteredList(defaultList);
      }
    }
  };

  return (
    <div>
      <Tooltip title={`Sort by ${id}`}>
        <Button
          type="default"
          shape="circle"
          id={id}
          icon={setIcon(isSortableBy)}
          onClick={(e) => sortByParam(e, id)}
        />
      </Tooltip>
    </div>
  );
};

export default SortByButton;
