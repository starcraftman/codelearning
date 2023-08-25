import React from "react";

const DEFAULT_STATE = {value: "", isTouched: false}
const inputReducer = (state, action) => {
  if (action.type === "CHANGE") {
    return {
      value: action.val,
      isTouched: state.isTouched
    }
  } else if (action.type === "BUR") {
    return {
      value: state.value,
      isTouched: true
    }
  }

  return DEFAULT_STATE;
}

const useInput = (validateValue) => {
  const [inputState, inputDispatcher] = React.useReducer(inputReducer, DEFAULT_STATE);
  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const changeHandler = (event) => {
    inputDispatcher({
      type: "CHANGE",
      val: event.target.value
    })
  };
  const inputBlurHandler = (event) => {
    inputDispatcher({
      type: "BLUR",
    })
  };
  const reset = () => {
    inputDispatcher({
      type: "RESET",
    })
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    changeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
