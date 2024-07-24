import { useState } from "react";
import useInput from "../../hooks/userInput";

import classes from "./EmailForm.module.css";
import Spinner from "../UI/Spinner";
import AuthAlert from "../alerts/AuthAlert";
import { sendEmails } from "../../api/api";

const EmailForm = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertStatus, setAlertStatus] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const {
    value: emailInput,
    enteredValueIsValid: emailInputIsValid,
    hasError: emailInputIsInvalid,
    valueInputChangedHandler: emailInputChangedHandler,
    valueInputBlurHandler: emailInputBlurHandler,
    reset: emailInputReset,
  } = useInput((value) => value.trim().includes("@"));

  const {
    value: passwordInput,
    enteredValueIsValid: passwordInputIsValid,
    hasError: passwordInputIsInvalid,
    valueInputChangedHandler: passwordInputChangedHandler,
    valueInputBlurHandler: passwordInputBlurHandler,
    reset: passwordInputReset,
  } = useInput((value) => value.trim() !== "");
  const {
    value: companyInput,
    enteredValueIsValid: companyInputIsValid,
    hasError: companyInputIsInvalid,
    valueInputChangedHandler: companyInputChangedHandler,
    valueInputBlurHandler: companyInputBlurHandler,
    reset: companyInputReset,
  } = useInput((value) => value.trim() !== "");
  const {
    value: replyToInput,
    enteredValueIsValid: replyToInputIsValid,
    hasError: replyToInputIsInvalid,
    valueInputChangedHandler: replyToInputChangedHandler,
    valueInputBlurHandler: replyToInputBlurHandler,
    reset: replyToInputReset,
  } = useInput((value) => value.trim() !== "");
  const {
    value: emailToInput,
    enteredValueIsValid: emailToInputIsValid,
    hasError: emailToInputIsInvalid,
    valueInputChangedHandler: emailToInputChangedHandler,
    valueInputBlurHandler: emailToInputBlurHandler,
    reset: emailToInputReset,
  } = useInput((value) => value.trim() !== "");
  const {
    value: subjectInput,
    enteredValueIsValid: subjectInputIsValid,
    hasError: subjectInputIsInvalid,
    valueInputChangedHandler: subjectInputChangedHandler,
    valueInputBlurHandler: subjectInputBlurHandler,
    reset: subjectInputReset,
  } = useInput((value) => value.trim() !== "");
  const {
    value: introInput,
    enteredValueIsValid: introInputIsValid,
    hasError: introInputIsInvalid,
    valueInputChangedHandler: introInputChangedHandler,
    valueInputBlurHandler: introInputBlurHandler,
    reset: introInputReset,
  } = useInput((value) => value.trim() !== "");
  const {
    value: bodyInput,
    enteredValueIsValid: bodyInputIsValid,
    hasError: bodyInputIsInvalid,
    valueInputChangedHandler: bodyInputChangedHandler,
    valueInputBlurHandler: bodyInputBlurHandler,
    reset: bodyInputReset,
  } = useInput((value) => value.trim() !== "");
  const {
    value: footerInput,
    enteredValueIsValid: footerInputIsValid,
    hasError: footerInputIsInvalid,
    valueInputChangedHandler: footerInputChangedHandler,
    valueInputBlurHandler: footerInputBlurHandler,
    reset: footerInputReset,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (
    companyInputIsValid &&
    footerInputIsValid &&
    introInputIsValid &&
    bodyInputIsValid &&
    subjectInputIsValid &&
    emailInputIsValid &&
    emailToInputIsValid &&
    passwordInputIsValid &&
    replyToInputIsValid
  ) {
    formIsValid = true;
  }

  const resetInputHandler = () => {
    companyInputReset();
    footerInputReset();
    introInputReset();
    bodyInputReset();
    subjectInputReset();
    emailInputReset();
    emailToInputReset();
    passwordInputReset();
    replyToInputReset();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowSpinner(true);

    const data = {
      company: companyInput,
      footer: footerInput,
      intro: introInput,
      body: bodyInput,
      subject: subjectInput,
      emailFrom: emailInput,
      emailTo: emailToInput.split(","),
      password: passwordInput,
      replyTo: replyToInput,
    };

    const res = await sendEmails(data);
    if (res.status === "success") {
      setAlertMsg(res.message);
      setAlertStatus(true);
      setShowAlert(true);
    } else {
      setAlertMsg(res.message);
      setAlertStatus(false);
      setShowAlert(true);
    }
    setShowSpinner(false);
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };

  const companyInputClasses = companyInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;
  const emailInputClasses = emailInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;
  const passwordInputClasses = passwordInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;
  const replyToInputClasses = replyToInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;
  const introInputClasses = introInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;
  const emailToInputClasses = emailToInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;
  const footerInputClasses = footerInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;
  const subjectInputClasses = subjectInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;
  const bodyInputClasses = bodyInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {showAlert && <AuthAlert message={alertMsg} status={alertStatus} />}
      {showSpinner && <Spinner />}
      <h1>Please complete the form</h1>
      <div className={companyInputClasses}>
        <label>Senders name</label>
        <input
          type="text"
          value={companyInput}
          onChange={companyInputChangedHandler}
          onBlur={companyInputBlurHandler}
        />
      </div>
      <div className={emailInputClasses}>
        <label>Senders email</label>
        <input
          type="text"
          value={emailInput}
          onChange={emailInputChangedHandler}
          onBlur={emailInputBlurHandler}
        />
      </div>
      <div className={passwordInputClasses}>
        <label>Senders password</label>
        <input
          type="text"
          value={passwordInput}
          onChange={passwordInputChangedHandler}
          onBlur={passwordInputBlurHandler}
        />
      </div>
      <div className={replyToInputClasses}>
        <label>Reply To</label>
        <input
          type="text"
          value={replyToInput}
          onChange={replyToInputChangedHandler}
          onBlur={replyToInputBlurHandler}
        />
      </div>
      <div className={emailToInputClasses}>
        <label>List of receipients</label>
        <textarea
          type="text"
          value={emailToInput}
          onChange={emailToInputChangedHandler}
          onBlur={emailToInputBlurHandler}
        />
      </div>
      <div className={subjectInputClasses}>
        <label>Subject</label>
        <input
          type="text"
          value={subjectInput}
          onChange={subjectInputChangedHandler}
          onBlur={subjectInputBlurHandler}
        />
      </div>
      <div className={introInputClasses}>
        <label>Message Greeting</label>
        <input
          type="text"
          placeholder="Dear client"
          value={introInput}
          onChange={introInputChangedHandler}
          onBlur={introInputBlurHandler}
        />
      </div>
      <div className={bodyInputClasses}>
        <label>Message body</label>
        <textarea
          type="text"
          value={bodyInput}
          onChange={bodyInputChangedHandler}
          onBlur={bodyInputBlurHandler}
        />
      </div>
      <div className={footerInputClasses}>
        <label>Signature</label>
        <input
          type="text"
          value={footerInput}
          onChange={footerInputChangedHandler}
          onBlur={footerInputBlurHandler}
        />
      </div>
      <div className={classes.action}>
        <button type="submit" disabled={!formIsValid}>
          Send emails
        </button>
        <button type="button" onClick={resetInputHandler}>
          Reset inputs
        </button>
      </div>
    </form>
  );
};

export default EmailForm;
