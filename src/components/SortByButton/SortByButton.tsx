import { Button, Tooltip } from "antd";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
  AlignCenterOutlined
} from "@ant-design/icons";
import { useState } from "react";
import { Quote } from "../../utils/types";

const SortByButton = ({ list, id }: { list: Quote[] | undefined; id: any }) => {
  const [filteredList, setFilteredList] = useState([]);
  const [buttonName, setbuttonName] = useState("");
  const [isSortableBy, setIsSortableBy] = useState("asc");

  // const sortByParam = (e: any, param: string) => {
  //   setbuttonName(e.currentTarget.id);
  //   console.log("list", list);

  //   if (list) {
  //     const defaultList = [...list];

  //     if (param.trim() === "") return;

  //     if (!isSortableBy) {
  //       defaultList.sort((a: any, b: any) => (b[param] > a[param] ? 1 : -1));
  //       setIsSortableBy(true);
  //     } else {
  //       defaultList.sort((a: any, b: any) => (a[param] > b[param] ? 1 : -1));
  //       setIsSortableBy(false);
  //     }
  //     //setFilteredList(defaultList);
  //   }
  // };

  const setIcon = (name: string) => {
    switch (name) {
      case "asc":
        return <SortDescendingOutlined />;
      case "desc":
        return <SortAscendingOutlined />;
      case "def":
        return <AlignCenterOutlined />;
      default:
        return <SortAscendingOutlined />;
    }
  };

  const sortByParam = (e: any, param: string) => {
    setbuttonName(e.currentTarget.id);
    const defaultList = [...filteredList];
    if (!defaultList.length) return;
    if (param.trim() === "") return;

    switch (isSortableBy) {
      case "asc":
        defaultList.sort((a: any, b: any) => (a[param] > b[param] ? 1 : -1));

        setIsSortableBy("desc");
        console.log("asc", isSortableBy);
        setFilteredList(defaultList);
        setIcon("desc");

        //setIcon('desc')
        break;

      case "desc":
        defaultList.sort((a: any, b: any) => (b[param] > a[param] ? 1 : -1));
        setIsSortableBy("def");
        setIcon("asc");

        console.log("desc", isSortableBy);
        setFilteredList(defaultList);

        //setIcon('def')
        break;

      case "def":
        // setFilteredList(fullList);
        setIsSortableBy("asc");
        setIcon("def");

        // console.log('fullList', fullList)
        // console.log('filteredList', filteredList)

        //('asc')
        break;

      default:
        // setFilteredList(fullList);
        setIcon("asc");
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
