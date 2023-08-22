import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const DEFAULT_FORM_STATE = { 
  email: '', 
  password: '',
  emailValid: true,
  passwordValid: true,
};
const formReducer = (state, action) => {
  let newState = DEFAULT_FORM_STATE;
  switch (action.type) {
    case "EMAIL_INPUT":
      newState = {
        ...state, 
        email: action.val, 
        emailValid: action.val.includes('@')
      }
      break;
      
      case "PASS_INPUT":
      newState = {
        ...state, 
        password: action.val, 
        passwordValid: action.val.trim().length > 6
      }
      break;

      case "EMAIL_BLUR":
        newState = {
          ...state, 
          emailValid: state.email.includes('@')
        }
        break;

      case "PASS_BLUR":
        newState = {
          ...state, 
          passwordValid: state.password.trim().length > 6
        }
        break;  
      default:
        newState = DEFAULT_FORM_STATE;
        break;
  }

  return newState;
}

const Login = (props) => {
  const [formState, formDispatch] = useReducer(formReducer, DEFAULT_FORM_STATE)
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);


  // useEffect(() => {
  //   console.log("Effect running");
  // })

  const { emailValid, passwordValid } = formState;
  useEffect(() => {
    const timeoutHandle = setTimeout(() => {
      console.log("Check validity.");
      setFormIsValid(emailValid && passwordValid);
    }, 500);

    return () => {
      console.log("Cleanup check validity");
      clearTimeout(timeoutHandle);
    }
  }, [emailValid, passwordValid])

  const emailChangeHandler = (event) => {
    formDispatch({
      type: "EMAIL_INPUT",
      val: event.target.value
    })
  };

  const passwordChangeHandler = (event) => {
    formDispatch({
      type: "PASS_INPUT",
      val: event.target.value
    })
  };

  const validateEmailHandler = () => {
    formDispatch({
      type: "EMAIL_BLUR",
    })
  };

  const validatePasswordHandler = () => {
    formDispatch({
      type: "PASS_BLUR",
    })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(formState.email, formState.password);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            formState.emailValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={formState.email}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            formState.passwordValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formState.password}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
