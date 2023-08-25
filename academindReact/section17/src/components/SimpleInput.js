import React from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = React.useState("");
  const [nameValid, setNameValid] = React.useState(false);
  const [nameTouched, setNameTouched] = React.useState(false);

  const nameChangeHandler = (event) => {
    setNameTouched(true);
    if (event.target.value.trim() !== "") {
      setNameValid(true);
    }
    setEnteredName(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (enteredName.trim() === "") {
      setNameValid(false);
      setNameTouched(true);
      return;
    }
    setNameValid(true);
    console.log("Entered", enteredName);
  };

  const onBlurHandler = (event) => {
    setNameTouched(true);
    if (enteredName.trim() === "") {
      setNameValid(false);
    }
  }

  React.useEffect(() => {
    if (nameValid) {
      console.log("Name input is valid.");
    }
  }, [nameValid]);

  const nameInError = !nameValid && nameTouched;
  const nameInputClasses = `form-control ${nameInError ? "invalid" : ""}`;
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={onBlurHandler}
        />
        {nameInError && <p className="error-text">Name must not be empty.</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
