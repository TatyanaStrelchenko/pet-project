

import React, {
    useState,
    useEffect,
  } from "react";
  import axios from 'axios';
  
export const useFetchQuotes = (baseUrl) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
  
    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
  
            try {
                const result = await axios(baseUrl);
  
                setData(result.data);
            } catch (error) {
                setIsError(true);
            }
  
            setIsLoading(false);
        };
  
        fetchData();
    }, [baseUrl]);
  
    return [{ data, isLoading, isError }];
}