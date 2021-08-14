import { useState } from "react";
import doneGif from "../assets/done.gif";
import gif from "../assets/nope.gif";
import notry from "../assets/notry.gif";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");

  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const [done, setDone] = useState(false);

  const [noTry, setNoTry] = useState(false);

  let formIsValid = false;

  if (enteredNameIsValid) {
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

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    setEnteredNameTouched(true);

    if (!enteredNameIsValid) {
      return;
    }

    setEnteredName(enteredName);
    setDone(true);
    setEnteredName("");
    setEnteredNameTouched(false);
  };

  const nameInputClasses = !nameInputIsInvalid
    ? "form-control"
    : "form-control invalid";

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

      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
