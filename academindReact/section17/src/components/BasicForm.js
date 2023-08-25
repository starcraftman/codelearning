import useInput from "../hooks/use-input2";

const validateName = (name) => name.trim() !== "";
const validateEmail = (email) => {
  return email.indexOf("@") !== -1 && email.endsWith(".com");
};

const BasicForm = (props) => {
  const firstName = useInput(validateName);
  const lastName = useInput(validateName);
  const email = useInput(validateEmail);
  const formIsValid = firstName.isValid && lastName.isValid && email.isValid;

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    console.log("Entered", firstName.value, lastName.value, email.value);

    firstName.reset();
    lastName.reset();
    email.reset();
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="control-group">
        <div className={`form-control ${firstName.hasError ? "invalid" : ""}`}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName.value}
            onBlur={firstName.blurHandler}
            onChange={firstName.changeHandler}
          />
          {firstName.hasError && (
            <p className="error-text">First Name must not be empty.</p>
          )}
        </div>
        <div className={`form-control ${lastName.hasError ? "invalid" : ""}`}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName.value}
            onBlur={lastName.blurHandler}
            onChange={lastName.changeHandler}
          />
          {lastName.hasError && (
            <p className="error-text">Last Name must not be empty.</p>
          )}
        </div>
      </div>
      <div className={`form-control ${email.hasError ? "invalid" : ""}`}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email.value}
          onBlur={email.blurHandler}
          onChange={email.changeHandler}
        />
        {email.hasError && <p className="error-text">Email must be valid.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
