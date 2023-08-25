import React from "react";

const useHttp = (url, requestConfig, handleData) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const sendRequest = React.useCallback(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url, requestConfig);
        if (!response.ok) {
          throw new Error('Request failed!');
        }

        handleData(await response.json());
      } catch (err) {
        setError(err.message || 'Something went wrong!');
      } finally{
        setIsLoading(false);
      }
    }, [url, requestConfig, handleData]);

  return  {
    isLoading,
    error,
    sendRequest
  }
}

export default useHttp;
