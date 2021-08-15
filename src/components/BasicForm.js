import useMyInput from "../hooks/use-myinput";

const isNotEmpty = (value) => value.trim() !== "";

const BasicForm = (props) => {
  const {
    enteredValue: firstNameEnteredValue,

    isValid: firstNameIsValid,
    isTouched: firstNameIsTouched,
    hasError: firstNameHasError,

    changeHandler: firstNameChangeHandler,
    blurHandler: firstNameBlurHandler,
    reset: firstNameReset,
  } = useMyInput(isNotEmpty);

  const {
    enteredValue: lastNameEnteredValue,

    isValid: lastNameIsValid,
    isTouched: lastNameIsTouched,
    hasError: lastNameHasError,
    changeHandler: lastNameChangeHandler,
    blurHandler: lastNameBlurHandler,
    reset: lastNameReset,
  } = useMyInput(isNotEmpty);

  const {
    enteredValue: emailEnteredValue,

    isValid: emailIsValid,
    isTouched: emailIsTouched,
    hasError: emailHasError,

    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
    reset: emailReset,
  } = useMyInput((value) => value.includes("@"));

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("SUBMIT");
    console.log(firstNameEnteredValue);
    console.log(lastNameEnteredValue);
    console.log(emailEnteredValue);
    firstNameReset();
    lastNameReset();
    emailReset();
  };

  let formIsValid = false;

  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const firstNameClasses = !firstNameHasError
    ? "form-control"
    : "form-control invalid";

  const lasttNameClasses = !lastNameHasError
    ? "form-control"
    : "form-control invalid";

  const emailClasses = !emailHasError ? "form-control" : "form-control invalid";

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="control-group">
        <div className={firstNameClasses}>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            value={firstNameEnteredValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
        </div>
        {firstNameIsTouched && !firstNameIsValid && (
          <p>Please enter a valid name!</p>
        )}
        <div className={lasttNameClasses}>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            value={lastNameEnteredValue}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
        </div>
      </div>
      {lastNameIsTouched && !lastNameIsValid && (
        <p>Please enter a valid name!</p>
      )}
      <div className={emailClasses}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          value={emailEnteredValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
      </div>
      {emailIsTouched && !emailIsValid && <p>Please enter a valid E-Mail!</p>}
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
