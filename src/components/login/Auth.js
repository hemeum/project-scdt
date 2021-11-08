import axios from 'axios';
import React, { useState, useRef } from 'react';

import useInput from './../../hooks/useInput.js';
import useFocus from './../../hooks/useFocus.js';

import './../../styles/layouts/login/auth.css';

function Auth({ history }) {
  const [inputFocus, setInputFocus] = useState(false);
  const [repeatUsername, setRepeatUsername] = useState(false);

  const [selectGenderValue, setSelectGenderValue] = useState('');
  const [selectMonthValue, setSelectMonthValue] = useState('');
  const [joinData, setJoinData] = useState(false);

  const genderRef = useRef();
  const monthRef = useRef();

  const testCheck = (rgx, data, dataFs) => {
    const checkRgx = rgx;
    if (checkRgx.test(data.inputValue) /*|| data.inputValue.length === 0*/) {
      dataFs.setTest(true);
      return true;
    } else if (!checkRgx.test(data.inputValue) /*&& data.inputValue.length !== 0*/) {
      dataFs.setTest(false);
      return false;
    }
  };

  const yearTestCheck = () => {
    const checkRgx = /^[0-9]{4}$/; // 정규표현식을 변수에 할당 후 test()안에 내가 테스트할 값을 넣어준다. 그 값이 정규표현식 조건에 맞는다면 트루 아니라면 펄스
    if (checkRgx.test(bYear.inputValue) && bYear.inputValue.length === 4 && monthRef.current.value === 'month') {
      bYearFs.setFocus(false);
      bMonthFs.setFocus(true);
      bYearFs.setTest(true);
    } else if (
      checkRgx.test(bYear.inputValue) &&
      bYear.inputValue.length === 4 &&
      monthRef.current.value === 'month' &&
      bDay.inputValue.length === 0
    ) {
      bDayFs.setFocus(true);
      bMonthFs.setFocus(false);
      bYearFs.setFocus(false);
    }
  };

  const dayTestCheck = () => {
    const checkRgx = /^[0-9]{1,2}$/;
    if (
      checkRgx.test(bDay.inputValue) === true &&
      (bDay.inputValue.length === 1 || bDay.inputValue.length === 2) &&
      bDay.inputValue <= 31
    ) {
      bYearFs.setFocus(false);
      bMonthFs.setFocus(false);
      bDayFs.setFocus(false);
      bDayFs.setTest(true);
    } else if ((checkRgx.test(bDay.inputValue) === false && bYear.inputValue.length !== 0) || bDay.inputValue >= 31) {
      bYearFs.setFocus(false);
      bMonthFs.setFocus(false);
      bDayFs.setFocus(true);
    }
    {
      /*else if (
      checkRgx.test(bDay.inputValue) === false &&
      bYear.inputValue.length !== 0 &&
      monthRef.current.value === 'month'
    ) {
      bYearFs.setFocus(true);
      bMonthFs.setFocus(false);
      bDayFs.setFocus(false);
    }*/
    }
  };

  const rePwdTestCheck = () => {
    if (pwd.inputValue !== checkPwd.inputValue && checkPwd.inputValue.length !== 0) {
      checkPwdFs.setTest(false);
    } else {
      checkPwdFs.setTest(true);
    }
  };

  const usernameFs = useFocus(false, () => {
    return testCheck(/^[a-zA-Z0-9]{5,20}$/gm, username, usernameFs);
  });
  const pwdFs = useFocus(false, () => {
    return testCheck(/^[a-zA-Z0-9!@#$%^&*]{8,16}$/gm, pwd, pwdFs);
  });
  const checkPwdFs = useFocus(false, () => {
    return rePwdTestCheck();
  });
  const nameFs = useFocus(false, () => {
    return testCheck(/^[가-힣a-zA-Z]{1,20}$/, name, nameFs);
  });
  const genderFs = useFocus(false);
  const bYearFs = useFocus(false);
  const bMonthFs = useFocus(false);
  const bDayFs = useFocus(false);
  const pNFs = useFocus(false, () => {
    return testCheck(/^[0-9]{9,11}$/, phoneNumber, pNFs);
  });

  const username = useInput('', setInputFocus, usernameFs.setTest);
  const pwd = useInput('', pwdFs.setFocus, pwdFs.setTest);
  const checkPwd = useInput('', checkPwdFs.setFocus, checkPwdFs.setTest);
  const name = useInput('', nameFs.setFocus, nameFs.setTest);
  const bYear = useInput('', bYearFs.setFocus, bYearFs.setTest);
  const bDay = useInput('', bDayFs.setFocus, bDayFs.setTest);
  const phoneNumber = useInput('', pNFs.setFocus, pNFs.setTest);

  const selectGenderChange = (e) => {
    // 성별을 변경하였을 때 바로 동작 (select)
    setSelectGenderValue(e.target.value);
    if (e.target.value !== 'gender') {
      genderFs.setFocus(false);
      genderFs.setTest(true);
    } else if (e.target.value === 'gender') {
      genderFs.setFocus(true);
    }
  };

  const selectMonthChange = (e) => {
    // 생년월일 '월'을 변경하였을 때 바로 동작 (select)
    setSelectMonthValue(e.target.value);
    if (e.target.value !== 'month' && bYear.inputValue.length === 0) {
      bDayFs.setFocus(false);
      bMonthFs.setFocus(false);
      bYearFs.setFocus(true);
    } else if (e.target.value === 'month' && bYear.inputValue.length !== 0) {
      bYearFs.setFocus(false);
      bDayFs.setFocus(false);
      bMonthFs.setFocus(true);
    } else if (e.target.value !== 'month' && bDay.inputValue.length === 0 && bYear.inputValue.length !== 0) {
      bYearFs.setFocus(false);
      bMonthFs.setFocus(false);
      bDayFs.setFocus(true);
      bMonthFs.setTest(true);
    } else if (monthRef.current.value !== 'month' && bDay.inputValue.length !== 0 && bYear.inputValue.length !== 0) {
      bYearFs.setFocus(false);
      bMonthFs.setFocus(false);
      bDayFs.setFocus(false);
      bMonthFs.setTest(true);
    }
  };

  const blurUsername = async (e) => {
    const check = () => {
      return testCheck(/^[a-zA-Z0-9]{5,20}$/gm, username, usernameFs);
    };

    if (e.target.value.length === 0) {
      setInputFocus(true);
    }

    if (check()) {
      const authUsername = await axios.post('/auth/username', { username: e.target.value });

      if (authUsername.data.repeat && e.target.value.length !== 0) {
        setRepeatUsername(true);
      } else {
        setRepeatUsername(false);
      }
    }
  };

  const blurGender = () => {
    // 성별에서 blur를 발생시켰을 때
    if (genderRef.current.value === 'gender') {
      genderFs.setFocus(true);
    }
  };

  const blurYear = () => {
    // 생년월일 '년'에서 blur를 발생시켰을 때
    if (bYear.inputValue.length !== 4) {
      bYearFs.setFocus(true);
      bMonthFs.setFocus(false);
      bDayFs.setFocus(false);
    } else if (bYear.inputValue.length === 4 && monthRef.current.value === 'month') {
      bYearFs.setFocus(false);
      bDayFs.setFocus(false);
      bMonthFs.setFocus(true);
    } else if (bYear.inputValue.length === 4 && monthRef.current.value !== 'month' && bDay.inputValue.length === 0) {
      bYearFs.setFocus(false);
      bMonthFs.setFocus(false);
      bDayFs.setFocus(true);
    }
    yearTestCheck();
  };

  const blurMonth = () => {
    // 생년월일 '월'에서 blur를 발생시켰을 때
    if (monthRef.current.value === 'month' && bYear.inputValue.length !== 0) {
      bYearFs.setFocus(false);
      bDayFs.setFocus(false);
      bMonthFs.setFocus(true);
    } else if (monthRef.current.value !== 'month' && bDay.inputValue.length === 0 && bYear.inputValue.length !== 0) {
      bYearFs.setFocus(false);
      bMonthFs.setFocus(false);
      bDayFs.setFocus(true);
    } else if (monthRef.current.value !== 'month' && bYear.inputValue.length === 0) {
      bDayFs.setFocus(false);
      bMonthFs.setFocus(false);
      bYearFs.setFocus(true);
    } else if (monthRef.current.value !== 'month' && bDay.inputValue.length !== 0 && bYear.inputValue.length !== 0) {
      bYearFs.setFocus(false);
      bMonthFs.setFocus(false);
      bDayFs.setFocus(false);
    }
  };

  const blurDay = () => {
    // 생년월일 '일'에서 blur를 발생시켰을 때
    if (bDay.inputValue.length !== 0 && monthRef.current.value !== 'month' && bYear.inputValue.length !== 0) {
      bYearFs.setFocus(false);
      bMonthFs.setFocus(false);
      bDayFs.setFocus(false);
    } else if (bDay.inputValue.length === 0 && monthRef.current.value !== 'month' && bYear.inputValue.length !== 0) {
      bYearFs.setFocus(false);
      bMonthFs.setFocus(false);
      bDayFs.setFocus(true);
    }
    dayTestCheck();
  };

  const submitJoin = async (e) => {
    e.preventDefault();
    await axios.post('/auth/join', {
      username: username.inputValue,
      pwd: pwd.inputValue,
      name: name.inputValue,
      gender: selectGenderValue,
      birthdayYear: bYear.inputValue,
      birthdayMonth: selectMonthValue,
      birthdayDay: bDay.inputValue,
      phoneNumber: phoneNumber.inputValue,
    });
    history.push('/user');
    window.scrollTo(0, 0);
  };

  const joinButton = (e) => {
    if (
      usernameFs.test === true &&
      pwdFs.test === true &&
      checkPwdFs.test === true &&
      nameFs.test === true &&
      genderFs.test === true &&
      bYearFs.test === true &&
      bMonthFs.test === true &&
      bDayFs.test === true &&
      pNFs.test === true
    ) {
      console.log('가입완료');
      setJoinData(true);
    } else {
      window.alert('정보를 다시 입력해주세요.');
      console.log('가입실패 : 유효성 검사 인증 실패로 인한');
      window.scrollTo(0, 0);
      history.push('/auth');
      setJoinData(false);
    }
    console.log(
      'test : ' + usernameFs.test,
      pwdFs.test,
      nameFs.test,
      genderFs.test,
      bYearFs.test,
      bMonthFs.test,
      bDayFs.test,
      pNFs.test,
    );
  };

  return (
    <div className="auth">
      <div className="auth-content">
        <header className="auth-content-header">
          <h2>회원가입</h2>
        </header>
        <form className="auth-content-list" onSubmit={submitJoin}>
          <div className="auth-content-list-item">
            <label htmlFor="username">아이디</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username.inputValue}
              onChange={username.handleInputValue}
              maxLength="20"
              onBlur={blurUsername} // usernameFs.handleFocus
            ></input>
            {/*
            {authData.length !== 0 && repeatUsername ? (
              <span className="inputError">이미 사용중이거나 탈퇴한 아이디입니다.</span>
            ) : null}*/}
            {repeatUsername && inputFocus === false && usernameFs.test === true ? (
              <span className="inputError">이미 사용중이거나 탈퇴한 아이디입니다.</span>
            ) : null}
            {inputFocus ? <span className="inputError">필수정보입니다.</span> : null}
            {usernameFs.test || username.inputValue.length === 0 ? null : (
              <span className="inputError">5~20자리의 영문 대소문자와 숫자만 사용가능합니다.</span>
            )}
          </div>
          <div className="auth-content-list-item">
            <label htmlFor="pwd">비밀번호</label>
            <input
              type="password"
              id="pwd"
              name="pwd"
              value={pwd.inputValue}
              onChange={pwd.handleInputValue}
              maxLength="16"
              onBlur={pwdFs.handleFocus}
            ></input>
            {pwdFs.focus ? <span className="inputError">필수정보입니다.</span> : null}
            {pwdFs.test || pwd.inputValue.length === 0 ? null : (
              <span className="inputError">8~16자리의 영문 대소문자와 숫자, 특수문자만 사용가능합니다.</span>
            )}
          </div>
          <div className="auth-content-list-item">
            <label htmlFor="checkPwd">비밀번호 재확인</label>
            <input
              type="password"
              id="checkPwd"
              name="checkPwd"
              value={checkPwd.inputValue}
              onChange={checkPwd.handleInputValue}
              maxLength="20"
              onBlur={checkPwdFs.handleFocus}
            ></input>
            {checkPwdFs.focus ? <span className="inputError">필수정보입니다.</span> : null}
            {checkPwdFs.test || checkPwd.inputValue.length === 0 ? null : (
              <span className="inputError">비밀번호가 일치하지 않습니다.</span>
            )}
          </div>
          <div className="auth-content-list-item">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name.inputValue}
              onChange={name.handleInputValue}
              maxLength="20"
              onBlur={nameFs.handleFocus}
            ></input>
            {nameFs.focus ? <span className="inputError">필수정보입니다.</span> : null}
            {nameFs.test || name.inputValue.length === 0 ? null : (
              <span className="inputError">한글과 영문 대소문자를 사용하세요.(특수문자, 공백 불가)</span>
            )}
          </div>
          <div className="auth-content-list-item">
            <p>성별</p>
            <select name="gender" ref={genderRef} onChange={selectGenderChange} onBlur={blurGender}>
              <option value="gender">성별</option>
              <option value="men">남자</option>
              <option value="women">여자</option>
            </select>
            <i className="fas fa-angle-down gender-icon"></i>
            {genderFs.focus ? <span className="inputError">필수정보입니다.</span> : null}
          </div>
          <div className="auth-content-list-item">
            <label htmlFor="yy" className="yy-header">
              생년월일
            </label>
            <div className="birthday">
              <input
                type="text"
                maxLength="4"
                id="yy"
                name="yy"
                placeholder="년(4자)"
                value={bYear.inputValue}
                onChange={bYear.handleInputValue}
                className="yy"
                aria-label="년(4자)"
                onBlur={blurYear}
              ></input>
              <select name="mm" ref={monthRef} onChange={selectMonthChange} onBlur={blurMonth}>
                <option value="month">월</option>
                <option value="jan">1</option>
                <option value="feb">2</option>
                <option value="mar">3</option>
                <option value="apr">4</option>
                <option value="may">5</option>
                <option value="jun">6</option>
                <option value="jul">7</option>
                <option value="aug">8</option>
                <option value="sep">9</option>
                <option value="oct">10</option>
                <option value="nov">11</option>
                <option value="dec">12</option>
              </select>
              <i className="fas fa-angle-down mm-icon"></i>
              <input
                type="text"
                maxLength="2"
                name="dd"
                placeholder="일"
                value={bDay.inputValue}
                onChange={bDay.handleInputValue}
                className="dd"
                aria-label="일"
                onBlur={blurDay}
              ></input>
            </div>
            {bYearFs.focus === true ? <span className="inputError">태어난 년도를 정확하게 입력해주세요.</span> : null}
            {bMonthFs.focus === true ? <span className="inputError">태어난 월을 정확하게 입력해주세요.</span> : null}
            {bDayFs.focus === true ? <span className="inputError">태어난 일을 정확하게 입력해주세요.</span> : null}
          </div>
          <div className="auth-content-list-item">
            <label htmlFor="phoneNumber">휴대전화</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="전화번호 입력"
              value={phoneNumber.inputValue}
              onChange={phoneNumber.handleInputValue}
              maxLength="11"
              onBlur={pNFs.handleFocus}
            ></input>
            {pNFs.focus ? <span className="inputError">필수정보입니다.</span> : null}
            {pNFs.test || phoneNumber.inputValue.length === 0 ? null : (
              <span className="inputError">9자리 이상이며, 숫자만 가능합니다.</span>
            )}
          </div>
          {/*
          <p className="auth-content-list-item">
            <input
              type="text"
              name="checkPhoneNumber"
              className="checkPhoneNumber"
              placeholder="인증번호를 입력하세요."
              value={checkPhoneNumber.inputValue}
              onChange={checkPhoneNumber.handleInputValue}
              maxLength="20"
            ></input>
            <button type="button" className="checkPhoneNumberButton">
              인증번호 받기
            </button>
          </p>
          */}
          <button type={joinData ? 'submit' : 'button'} className="join-button" onClick={joinButton}>
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
