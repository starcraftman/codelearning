import React from "react";

interface RequestConfigType {
  url: string;
  method: string;
  headers?: {};
  body?: string;
}

const useHttp = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const sendRequest = React.useCallback(async (requestConfig: RequestConfigType, handleData: any) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(requestConfig.url, requestConfig);
        if (!response.ok) {
          throw new Error('Request failed!');
        }

        const data = await response.json();
        handleData(data);
        return data;
      } catch (err: any) {
        setError(err.message || 'Something went wrong!');
      } finally{
        setIsLoading(false);
      }
    }, []);

  return  {
    isLoading,
    error,
    sendRequest,
  }
}

export default useHttp;
