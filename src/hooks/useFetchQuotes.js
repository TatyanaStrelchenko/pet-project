import React, { useState, useEffect } from "react";
import axios from "axios";

export const useFetchQuotes = () => {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState(
    "https://api.mockaroo.com/api/cf939070?count=1000&key=29f59060"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};
