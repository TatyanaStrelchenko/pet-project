import axios from "axios";

export const baseURL = 'https://api.mockaroo.com/api/400c5b90?count=30&key=bee4ecb0'

export const getRequest = (action: any) => {
    axios
      .get(baseURL)
      .then((response) => {
        action(response.data);
      });
}
export const postRequest = () => {
    axios
    .post(baseURL, {
      title: "Hello World!",
      body: "This is a new quote."
    })
    .then((response) => {
      console.log(response.data);
    });
}

export const putRequest = () => {
    axios
      .put(`${baseURL}/1`, {
        title: "Hello World!",
        body: "This is an updated quote."
      })
      .then((response) => {
        console.log(response.data);
      });
}
  
export const deletRequest = () => {
    axios
      .delete(`${baseURL}/1`)
      .then(() => {
        console.log("Quote deleted!");
        //setPost(null)
      });
}