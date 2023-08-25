import React from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = React.useState("");
  const [isTouched, setIsTouched] = React.useState(false);
  const isValid = validateValue(enteredValue);
  const hasError = !isValid && isTouched;

  const changeHandler = (event) => {
    setEnteredValue(event.target.value);
  }
  const blurHandler = (event) => {
    setIsTouched(true);
  }
  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  }

  return {
    value: enteredValue,
    isValid,
    hasError,
    changeHandler,
    blurHandler,
    reset
  }
}

export default useInput;
