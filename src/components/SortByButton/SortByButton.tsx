import { Button, Tooltip } from "antd";

import { Quote } from "../../utils/types";

const SortByButton = ({
  id,
  setIcon,
  sortByParam,
  isSortableBy,
}: {
  id: keyof Quote;
  setIcon: any;
  sortByParam: any;
    isSortableBy: string;
  }) => (
    <div>
    <Tooltip title={`Sort by ${id}`}>
        <Button
          type="default"
          shape="circle"
          id={id}
          //@ts-ignore
          icon={setIcon(isSortableBy)}
          onClick={() => sortByParam(id)}
      />
    </Tooltip>
  </div>
  )


export default SortByButton;
