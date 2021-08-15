import { useState } from "react";
import useInput from "../hooks/use-input";

import doneGif from "../assets/done.gif";
import gif from "../assets/nope.gif";
import notry from "../assets/notry.gif";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  // const [enteredName, setEnteredName] = useState("");
  // const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  // const enteredNameIsValid = enteredName.trim() !== "";
  // const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  // const enteredEmailIsValid =
  //   enteredEmail.includes("@") && enteredEmail.trim().length > 3;
  // const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  const [done, setDone] = useState(false);
  const [noTry, setNoTry] = useState(false);

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  // const nameInputChangeHandler = (e) => {
  //   setEnteredName(e.target.value);
  //   setDone(false);
  // };

  // const nameInputOnBlurHandler = () => {
  //   setEnteredNameTouched(true);
  // };

  const nameInputFocusHandler = () => {
    setDone(false);
    setNoTry(true);
  };

  // const emailChangeHandler = (e) => {
  //   setEnteredEmail(e.target.value);
  // };

  // const emailBlurHandler = () => {
  //   setEnteredEmailTouched(true);
  // };

  const emailInputFocusHandler = () => {};

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    // setEnteredNameTouched(true);
    // we don't need this anymore cause the button is disabled if the both field have not been 'touched'
    // setEnteredEmailTouched(true);

    if (!enteredNameIsValid && !enteredEmailIsValid) {
      return;
    }

    // setEnteredName(enteredName);

    // setEnteredName("");
    // setEnteredNameTouched(false);
    resetNameInput();

    // setEnteredEmailTouched(enteredEmailIsValid); // ???

    // setEnteredEmail("");
    // setEnteredEmailTouched(false);
    resetEmailInput();

    setDone(true);
  };

  const nameInputClasses = !nameInputHasError
    ? "form-control"
    : "form-control invalid-name";

  const emailInputClasses = !emailInputHasError
    ? "form-control"
    : "form-control invalid-email";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          onFocus={nameInputFocusHandler}
          onBlur={nameBlurHandler}
          onChange={nameChangeHandler}
          value={enteredName}
          type="text"
          id="name"
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty!</p>
        )}
        {noTry && nameInputHasError && !done && (
          <img className="notry" src={notry} alt="do or do not" />
        )}
        {nameInputHasError && <img className="gif" src={gif} alt="nope" />}
        {done && <img className="done" src={doneGif} alt="done" />}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your e-Mail</label>
        <input
          onFocus={emailInputFocusHandler}
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
          value={enteredEmail}
          type="email"
          id="email"
        />
        {emailInputHasError && (
          <p className="error-text">Please enter a valid e-Mail!</p>
        )}
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
