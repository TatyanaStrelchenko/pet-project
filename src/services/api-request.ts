import { notification } from "antd";
import axios from "axios";


const openNotification = (message: string) => {
  notification.open({
    message: 'Something went wrong!',
    description: `${message}`,
  });
};


export const getRequest = async (url: string) =>
  axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      openNotification(error);
    });

export const postRequest = async (url: string) =>
  axios
    .post(url, {})
    .then((response) => response.data)
    .catch((error) => {
      openNotification(error);
    });

export const putRequest = async (url: string) =>
  axios
    .put(`${url}/1`, {})
    .then((response) => response.data)
    .catch((error) => {
      openNotification(error);
    });

export const deleteRequest = async (url: string) =>
  axios.delete(`${url}/1`).then(() => {
    console.log("Deleted!");
  });
