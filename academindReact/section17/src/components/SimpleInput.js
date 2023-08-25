import React from "react";

import useInput from "../hooks/use-input";

const validateEmail = (email) => {
  return email.indexOf("@") !== -1 && email.endsWith(".com");
};

const validateName = (name) => {
  return name.trim() !== "";
}

const SimpleInput = (props) => {
  const nameField = useInput(validateName);
  const emailField = useInput(validateEmail);
  const formIsValid = nameField.isValid && emailField.isValid;

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!nameField.isValid) {
      return;
    }
    nameField.reset();
    emailField.reset();
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={`form-control ${nameField.hasError ? "invalid" : ""}`}>
        <label htmlFor="name">Your Name</label>
        <input
          value={nameField.value}
          type="text"
          id="name"
          onChange={nameField.changeHandler}
          onBlur={nameField.inputBlurHandler}
        />
        {nameField.hasError && <p className="error-text">Name must not be empty.</p>}
      </div>
      <div className={`form-control ${emailField.hasError ? "invalid" : ""}`}>
        <label htmlFor="email">Your Email</label>
        <input
          value={emailField.value}
          type="text"
          id="email"
          onChange={emailField.changeHandler}
          onBlur={emailField.inputBlurHandler}
        />
        {emailField.hasError && <p className="error-text">Check email please.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
