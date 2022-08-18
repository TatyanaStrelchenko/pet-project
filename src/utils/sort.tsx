import { Quote } from "./types";

export const sortBy = (type: string, param: keyof Quote, list: Quote[]) => {

  switch (type) {
      case "asc":
      list.sort((a: Quote, b: Quote) => (a[param] > b[param] ? 1 : -1));
      break;
    case "desc":
      list.sort((a: Quote, b: Quote) => (b[param] > a[param] ? 1 : -1));
      break;
    default:
      return list;
  }
};
