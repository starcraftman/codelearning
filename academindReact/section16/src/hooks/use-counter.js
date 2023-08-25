import React from "react";

const useCounter = (changeFunc) => {
    const [counter, setCounter] = React.useState(0);

    React.useEffect(() => {
      const interval = setInterval(() => {
        setCounter((prevCounter) => changeFunc(prevCounter));
      }, 1000);

      return () => clearInterval(interval);
    }, [changeFunc]);

  return counter;
};

export default useCounter;
