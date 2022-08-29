import axios from 'axios';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { KAKAO_REST_API_KEY } from '../../auth/Auth';
import { KAKAO_REDIRECT_URI } from '../../auth/Auth';
import '../Login/login_css/Login_All.scss';

const Login = () => {
  // 아이디 패스워드 인풋태그 Ref
  const idRef = useRef();
  const pwRef = useRef();

  // 페이지 이동 navigate
  const navigate = useNavigate();

  // 카카오 로그인 요청 URL
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  // 카카오 로그인 버튼 클릭시 페이지 이동
  const handelKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  // 로컬 로그인 엔터키 입력시 자동 로그인 버튼 클릭
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  // 로그인 버튼 클릭시 실행 함수
  const handleLogin = () => {
    // 아이디 입력 확인
    if (idRef.current.value === '' || idRef.current.value === undefined) {
      alert('아이디를 입력하세요!!!');
      idRef.current.focus();
      return false;
    }

    // 패스워드 입력 확인
    if (pwRef.current.value === '' || pwRef.current.value === undefined) {
      alert('패스워드를 입력하세요!!!');
      pwRef.current.focus();
      return false;
    }

    // 로그인 요청시 서버로 요청
    axios
      .post('http://localhost:8000/login', {
        id: idRef.current.value,
        pw: pwRef.current.value,
      })
      .then((res) => {
        console.log('로그인 정보 일치 확인', res);

        // 일치하는 사용자가 있을경우
        if (res.data.length === 1) {
          console.log('idx', res.data[0].USER_IDX);
          console.log('id', res.data[0].USER_ID);
          console.log('nickname', res.data[0].USER_NICK);

          // 로그인에 성공하고 세션에 값 저장
          window.sessionStorage.setItem('USER_ID', res.data[0].USER_ID);
          window.sessionStorage.setItem('USER_NICK', res.data[0].USER_NICK);
          window.sessionStorage.setItem('USER_IDX', res.data[0].USER_IDX);
          window.sessionStorage.setItem('JOIN_PATH', res.data[0].JOIN_PATH);

          // 세션에 값 저장후 메인페이지로 이동
          navigate('/');
        } else {
          //아이디 비밀번호 잘못 입력할 경우 input value 초기화
          idRef.current.value = '';
          pwRef.current.value = '';
          alert('아이디 또는 비밀번호가 틀립니다.');
          // 로그인 실패시 다시 로그인 페이지로
          navigate('/login');
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      <h1>로그인</h1>
      <form>
        <input
          className="id"
          type="email"
          name="id"
          size="20"
          defaultValue=""
          ref={idRef}
          placeholder="아이디를 입력하세요"
        />
        <br />
        <input
          className="pw"
          type="password"
          name="pw"
          size="20"
          defaultValue=""
          ref={pwRef}
          onKeyPress={onKeyPress}
          placeholder="패스워드를 입력하세요"
        />
        <br />
        <input
          className="login"
          type="button"
          value="로그인"
          onClick={handleLogin}
        />

        <p>───────── 또는 ─────────</p>

        <div className="sns-login-btn">
          <input
            className="kakao"
            type="button"
            value="KAKAO 계정으로 로그인"
            onClick={handelKakaoLogin}
          />
          <br />
          <input
            className="naver"
            type="button"
            value="NAVER 계정으로 로그인"
          />
          <br />

          <input
            className="facebook"
            type="button"
            value="FACEBOOK 계정으로 로그인"
          />
          <br />

          <input
            className="google"
            type="button"
            value="GOOGLE 계정으로 로그인"
          />
        </div>
        <br />
        <p>
          <a href="/forgot">비밀번호 찾기</a>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <a href="/register">회원가입 </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
