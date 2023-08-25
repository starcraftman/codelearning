import React from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = React.useState("");
  const [isTouched, setIsTouched] = React.useState(false);
  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const changeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };
  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    changeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
