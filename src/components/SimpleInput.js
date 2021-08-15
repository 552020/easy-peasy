import { useState } from "react";
import doneGif from "../assets/done.gif";
import gif from "../assets/nope.gif";
import notry from "../assets/notry.gif";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const enteredEmailIsValid =
    enteredEmail.includes("@") && enteredEmail.trim().length > 3;
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  const [done, setDone] = useState(false);
  const [noTry, setNoTry] = useState(false);

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const nameInputChangeHandler = (e) => {
    setEnteredName(e.target.value);
    setDone(false);
  };
  const nameInputOnBlurHandler = () => {
    setEnteredNameTouched(true);
  };

  const nameInputFocusHandler = () => {
    setDone(false);
    setNoTry(true);
  };

  const emailInputChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
    console.log(e.target.value);
  };

  const emailInputOnBlurHandler = () => {
    setEnteredEmailTouched(true);
  };

  const emailInputFocusHandler = () => {};

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    setEnteredNameTouched(true);
    setEnteredEmailTouched(true);

    if (!enteredNameIsValid && !enteredEmailIsValid) {
      return;
    }

    setEnteredName(enteredName);
    setEnteredEmailTouched(enteredEmailIsValid);
    setDone(true);
    setEnteredName("");
    setEnteredEmail("");
    setEnteredNameTouched(false);
    setEnteredEmailTouched(false);
  };

  const nameInputClasses = !nameInputIsInvalid
    ? "form-control"
    : "form-control invalid-name";

  const emailInputClasses = !emailInputIsInvalid
    ? "form-control"
    : "form-control invalid-email";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          onFocus={nameInputFocusHandler}
          onBlur={nameInputOnBlurHandler}
          onChange={nameInputChangeHandler}
          value={enteredName}
          type="text"
          id="name"
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty!</p>
        )}
        {noTry && !nameInputIsInvalid && !done && (
          <img className="notry" src={notry} alt="do or do not" />
        )}
        {nameInputIsInvalid && <img className="gif" src={gif} alt="nope" />}
        {done && <img className="done" src={doneGif} alt="done" />}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your e-Mail</label>
        <input
          onFocus={emailInputFocusHandler}
          onBlur={emailInputOnBlurHandler}
          onChange={emailInputChangeHandler}
          value={enteredEmail}
          type="email"
          id="email"
        />
        {emailInputIsInvalid && (
          <p className="error-text">Please entere a valid e-Mail!</p>
        )}
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
