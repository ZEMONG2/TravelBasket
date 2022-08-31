import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login/login_css/Login_All.scss';

const Register = () => {
  // 아이디 패스워드 닉네임 인풋태그 Ref
  const idRef = useRef();
  const pwRef = useRef();
  const pwCkRef = useRef();
  const nickRef = useRef();
  // 닉네임 중복확인
  const [nickComment, setNickComment] = useState('');
  const [idComment, setIdComment] = useState('');
  // 페이지 이동 navigate
  const navigate = useNavigate();

  // 로컬 회원가입 엔터키 입력시 자동 로그인 버튼 클릭
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  // 닉네임 중복 체크
  var nick = '';
  const nickChange = (e) => {
    nick = nickRef.current.value;
    axios.post('http://localhost:8000/nickCheck', { nick }).then((res) => {
      setNickComment('');
      if (res.data[0].CNT !== 0) {
        setNickComment('중복된 닉네임이 있습니다.');
      } else {
        setNickComment('');
      }
    });
  };

  // 아이디 중복 체크
  var id = '';
  const idChange = (e) => {
    id = idRef.current.value;
    axios.post('http://localhost:8000/idCheck', { id }).then((res) => {
      setIdComment('');
      if (res.data[0].CNT !== 0) {
        setIdComment('중복된 아이디가 있습니다.');
      } else {
        setIdComment('');
      }
    });
  };

  // 이메일 정규표현식 확인
  const emailCheck = (emailData) => {
    var REGEXP =
      /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;
    return REGEXP.test(emailData);
  };

  //  버튼 클릭시 실행 함수
  const handleRegister = () => {
    // 아이디 입력 확인
    if (
      idRef.current.value === '' ||
      idRef.current.value === undefined ||
      !emailCheck(idRef.current.value)
    ) {
      alert('올바른 아이디를 입력하세요(이메일 형식)!!!');
      idRef.current.focus();
      return false;
    }
    // 패스워드 입력 확인
    if (pwRef.current.value === '' || pwRef.current.value === undefined) {
      alert('패스워드를 입력하세요!!!');
      pwRef.current.focus();
      return false;
    }
    // 패스워드체크 입력 확인
    if (pwCkRef.current.value === '' || pwCkRef.current.value === undefined) {
      alert('패스워드를 한번더 입력하세요!!!');
      pwCkRef.current.focus();
      return false;
    }
    // 닉네임 입력 확인
    if (nickRef.current.value === '' || nickRef.current.value === undefined) {
      alert('닉네임을 입력하세요!!!');
      pwRef.current.focus();
      return false;
    }
    // 비밀번호 와 비밀번호 체크 값 비교
    if (pwRef.current.value !== pwCkRef.current.value) {
      alert('비밀번호가 서로 다릅니다!!!');
      pwCkRef.current.focus();
      return false;
    }

    // 회원가입 요청
    axios
      .post('http://localhost:8000/register', {
        id: idRef.current.value,
        pw: pwRef.current.value,
        nick: nickRef.current.value,
      })
      .then((res) => {
        console.log(res);
        //회원가입에 성공하면
        if (res.data === '회원가입성공') {
          //로그인 페이지로 이동
          navigate('/login');
        } else {
          // 회원가입에 실패하면 input value 초기화
          idRef.current.value = '';
          pwRef.current.value = '';
          pwCkRef.current.value = '';
          nickRef.current.value = '';

          // 회원가입 페이지로 이동
          navigate('/register');
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form>
        <p>{idComment}</p>
        <input
          className="id"
          type="email"
          name="id"
          size="20"
          defaultValue=""
          ref={idRef}
          onChange={idChange}
          placeholder="아이디를 입력하세요(이메일형식)"
        />
        <br />
        <input
          className="pw"
          type="password"
          name="pw"
          size="20"
          defaultValue=""
          ref={pwRef}
          placeholder="패스워드를 입력하세요"
        />
        <br />
        <input
          className="pwck"
          type="password"
          name="pwCk"
          size="20"
          defaultValue=""
          ref={pwCkRef}
          placeholder="패스워드를 한번 더 입력하세요"
        />
        <br />
        <p>{nickComment}</p>
        <input
          className="nick"
          type="text"
          name="nick"
          size="20"
          defaultValue=""
          ref={nickRef}
          onChange={nickChange}
          onKeyPress={onKeyPress}
          placeholder="닉네임을 입력하세요"
        />
        <br />
        <input
          className="sign_up"
          type="button"
          value="회원가입"
          onClick={handleRegister}
        />
      </form>
      <p>───────── 또는 ─────────</p>
      <div className="sns-register-btn">
        <input
          className="kakao"
          type="button"
          value="KAKAO 계정으로 회원가입"
        />
        <br />
        <input
          className="naver"
          type="button"
          value="NAVER 계정으로 회원가입"
        />
        <br />
        <input
          className="facebook"
          type="button"
          value="FACEBOOK 계정으로 회원가입"
        />
        <br />
        <input
          className="google"
          type="button"
          value="GOOGLE 계정으로 회원가입"
        />
      </div>
    </div>
  );
};

export default Register;