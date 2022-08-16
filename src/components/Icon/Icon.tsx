import {
  SortAscendingOutlined,
  SortDescendingOutlined,
  AlignCenterOutlined,
} from "@ant-design/icons";

import { ASC, DESC, DEFAULT } from "../../utils/constants";

const Icon = (name: string) => {
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

export default Icon;
