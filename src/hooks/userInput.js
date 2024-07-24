import { useState } from 'react';

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [files, setFiles] = useState('');

  const enteredValueIsValid = validateValue(enteredValue);
  const filesIsValid = validateValue(files);
  const enteredValueIsInvalid = !enteredValueIsValid && isTouched;
  const filesIsInvalid = !filesIsValid && isTouched;

  const valueInputChangedHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const fileInputChangedHandler = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const valueInputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  const resetFiles = () => {
    setFiles('');
  };

  return {
    value: enteredValue,
    hasError: enteredValueIsInvalid,
    enteredValueIsValid,
    valueInputChangedHandler,
    valueInputBlurHandler,
    files,
    filesIsInvalid,
    filesIsValid,
    fileInputChangedHandler,
    resetFiles,
    reset,
  };
};

export default useInput;
