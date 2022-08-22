import { getRequest } from "./api-request";

const baseURL = "https://api.mockaroo.com/api/e1a3ec10?count=8&key=29f59060";

export const getQuotes = async () => getRequest(baseURL);
