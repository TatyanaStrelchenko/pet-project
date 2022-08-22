import { notification } from "antd";

const openNotification = (message: string) => {
  console.log("Error", message);
  notification.open({
    message: "Something went wrong..",
    description: "I can't get quotes",
  });
};

export default openNotification;
