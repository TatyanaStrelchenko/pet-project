import { Button, Tooltip } from "antd";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Quote } from "../../utils/types";

const SortByButton = (list: Quote[] | undefined, id: any) => {
  const [isSortableBy, setIsSortableBy] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [buttonName, setbuttonName] = useState("");

  const sortByParam = (e: any, param: string) => {
    setbuttonName(e.currentTarget.id);
    console.log("list", list);

    if (list) {
      const defaultList = [...list];

      if (param.trim() === "") return;

      if (!isSortableBy) {
        defaultList.sort((a: any, b: any) => (b[param] > a[param] ? 1 : -1));
        setIsSortableBy(true);
      } else {
        defaultList.sort((a: any, b: any) => (a[param] > b[param] ? 1 : -1));
        setIsSortableBy(false);
      }
      //setFilteredList(defaultList);
    }
  };

  const setIcon = () =>
    isSortableBy && buttonName === "quote" ? (
      <SortAscendingOutlined />
    ) : (
      <SortDescendingOutlined />
    );

  return (
    <div>
      <Tooltip title={`{Sort by ${id}}`}>
        <Button
          type="default"
          shape="circle"
          // id={id}
          icon={setIcon()}
          onClick={(e) => sortByParam(e, id)}
        />
      </Tooltip>
      test
    </div>
  );
};

export default SortByButton;
