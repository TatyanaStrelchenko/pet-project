import axios from "axios";

export const getRequest = (url: string) =>
  axios.get(url).then((response) => response.data);

export const postRequest = (url: string) =>
  axios.post(url, {}).then((response) => response.data);
export const putRequest = (url: string) =>
  axios.put(`${url}/1`, {}).then((response) => response.data);
export const deletRequest = (url: string) =>
  axios.delete(`${url}/1`).then(() => {
    console.log("Deleted!");
  });
