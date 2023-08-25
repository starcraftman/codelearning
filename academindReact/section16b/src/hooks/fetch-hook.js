import React from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const sendRequest = React.useCallback(async (requestConfig, handleData) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(requestConfig.url, requestConfig);
        if (!response.ok) {
          throw new Error('Request failed!');
        }

        handleData(await response.json());
      } catch (err) {
        setError(err.message || 'Something went wrong!');
      } finally{
        setIsLoading(false);
      }
    }, []);

  return  {
    isLoading,
    error,
    sendRequest
  }
}

export default useHttp;
