import { useState } from 'react';

export default function useInput(initialValue, setFocus, setTest) {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
    if (inputValue !== 0) {
      setFocus(false);
    }
    if (inputValue !== 0) {
      setTest(true);
    }
  };

  return { inputValue, setInputValue, handleInputValue };
}
