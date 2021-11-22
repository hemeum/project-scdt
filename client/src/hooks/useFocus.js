import { useState } from 'react';

export default function useFocus(initialValue, check /*, authData, inputValue*/) {
  const [focus, setFocus] = useState(initialValue);
  const [test, setTest] = useState(false);

  /*const [repeatUsername, setRepeatUsername] = useState(false);*/

  const handleFocus = (e) => {
    /*
    const authDataUsername = authData.map((user) => {
      return user.username;
    });
    const usernameRepeatCheck = authDataUsername.filter((username) => {
      return username === inputValue();
    })[0];
    if (usernameRepeatCheck) {
      setRepeatUsername(true);
    } else {
      setRepeatUsername(false);
    }*/

    if (e.target.value.length === 0) {
      setFocus(true);
    }
    check();
  };

  return { focus, setFocus, handleFocus, test, setTest, check /*repeatUsername */ };
}
