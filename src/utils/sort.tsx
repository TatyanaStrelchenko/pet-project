import { QuoteType } from "./types";

export const sortBy = (type: string, param: keyof QuoteType, list: QuoteType[]) => {
  switch (type) {
    case "asc":
      list.sort((a: QuoteType, b: QuoteType) => (a[param] > b[param] ? 1 : -1));
      break;
    case "desc":
      list.sort((a: QuoteType, b: QuoteType) => (b[param] > a[param] ? 1 : -1));
      break;
    default:
      return list;
  }
};
