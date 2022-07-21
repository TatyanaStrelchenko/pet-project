import { getRequest } from "./api-request";

const baseURL = "https://api.mockaroo.com/api/400c5b90?count=30&key=bee4ecb0";

// export const getQuotes = () =>( getRequest(baseURL).then((response)=> response.data))

// export const getQuotes = () =>( getRequest(baseURL).then((response)=> response))

export const getQuotes = async () => {
  const result = await getRequest(baseURL);
  return result;
};
