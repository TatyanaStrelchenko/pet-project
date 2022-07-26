import { getRequest } from "./api-request";

const baseURL = "https://api.mockaroo.com/api/fa1cfd10?count=100&key=c8ac3e80";

export const getQuotes = async () => getRequest(baseURL)

