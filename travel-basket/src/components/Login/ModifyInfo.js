import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login/login_css/Login_All.scss';
import { IoIosContact } from 'react-icons/io';

const ModifyInfo = () => {
  const idRef = useRef();
  const pwRef = useRef();
  const pwCkRef = useRef();
  const nickRef = useRef();
  const [nickComment, setNickComment] = useState('');
  const [pwComment, setPwComment] = useState('');
  const user_id = window.sessionStorage.getItem('USER_ID');
  const user_nick = window.sessionStorage.getItem('USER_NICK');
  const join_path = window.sessionStorage.getItem('JOIN_PATH');
  // 페이지 이동 navigate
  const navigate = useNavigate();
  // 닉네임 중복 체크
  var nick = '';
  var emailMsg = user_id + ' (수정불가)';
  var nickMsg = user_nick + ' (닉네임 변경을 원할 시 입력하세요)';
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
  var pw1 = '';
  var pw2 = '';

  const pwChange = (e) => {
    pw1 = pwRef.current.value;
    pw2 = pwCkRef.current.value;

    setPwComment('');
    if (pw1 !== '' && pw2 !== '' && pw1 !== pw2) {
      setPwComment('비밀번호가 서로 다릅니다.');
    } else {
      setPwComment('');
    }
  };

  // 회원가입 버튼 클릭시 실행 함수
  const handleModify = () => {
    // if (join_path === 'LOCAL') {
    //   // 패스워드 입력 확인
    //   if (pwRef.current.value === '' || pwRef.current.value === undefined) {
    //     alert('패스워드를 입력하세요!!!');
    //     pwRef.current.focus();
    //     return false;
    //   }
    //   if (pwCkRef.current.value === '' || pwCkRef.current.value === undefined) {
    //     // 패스워드체크 입력 확인
    //     alert('패스워드를 한번더 입력하세요!!!');
    //     pwCkRef.current.focus();
    //     return false;
    //   }
    //   // 비밀번호 와 비밀번호 체크 값 비교
    //   if (pwRef.current.value !== pwCkRef.current.value) {
    //     alert('비밀번호가 서로 다릅니다!!!');
    //     pwCkRef.current.focus();
    //     return false;
    //   }
    // }

    // 닉네임 입력 확인
    if (nickRef.current.value === '' || nickRef.current.value === undefined) {
      alert('닉네임을 입력하세요!!!');
      nickRef.current.focus();
      return false;
    }
    // 닉네임 중복시 정보수정 불가
    if (nickComment === '중복된 닉네임이 있습니다.') {
      alert('닉네임을 수정하세요!!!');
      nickRef.current.focus();
      return false;
    }

    // 회원정보 수정 요청
    if (join_path === 'LOCAL') {
      axios
        .post('http://localhost:8000/modifyInfo', {
          id: user_id,
          pw: pwRef.current.value,
          nick: nickRef.current.value,
        })
        .then((res) => {
          console.log(res);
          //회원정보수정에 성공하면
          if (res.data === '닉네임 수정 성공') {
            //로그인 페이지로 이동 (재로그인)
            // window.sessionStorage.clear();
            window.sessionStorage.setItem('USER_NICK', nick);
            console.log('닉네임 세션 변경');
            alert('닉네임 수정 성공');
            navigate('/');
          } else if (res.data === '비밀번호 수정 성공') {
            //로그인 페이지로 이동 (재로그인)
            window.sessionStorage.clear();
            console.log('세션초기화');
            alert('비밀번호 수정 성공 / 다시로그인 해주세요');
            navigate('/login');
          } else {
            //로그인 페이지로 이동 (재로그인)
            window.sessionStorage.clear();
            console.log('세션초기화');
            alert('회원정보수정 성공 / 다시로그인 해주세요');
            navigate('/login');
          }
        })
        .catch((e) => {
          console.error(e);
        });
    } else if (join_path === 'KAKAO') {
      axios
        .post('http://localhost:8000/modifyInfo', {
          id: user_id,
          pw: 'kakao',
          nick: nickRef.current.value,
        })
        .then((res) => {
          console.log(res);
          //회원정보수정에 성공하면
          if (res.data === '닉네임 수정 성공') {
            //로그인 페이지로 이동 (재로그인)
            // window.sessionStorage.clear();
            window.sessionStorage.setItem('USER_NICK', nick);
            console.log('닉네임 세션 변경');
            alert('닉네임 수정 성공');
            navigate('/');
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  return (
    <div>
      <h1>회원정보 수정</h1>
      <form className="modify_group">
        <IoIosContact className="contact" />
        <br />
        <input
          className="id"
          type="email"
          name="id"
          size="20"
          value={emailMsg}
          ref={idRef}
          readOnly
          disabled
        />
        <br />
        {join_path === 'LOCAL' ? (
          <div>
            <input
              className="pw"
              type="password"
              name="pw"
              size="20"
              defaultValue=""
              onChange={pwChange}
              ref={pwRef}
              placeholder="비밀번호 변경을 원할 시 입력하세요"
            />
            <br />
            <input
              className="pwck"
              type="password"
              name="pwCk"
              size="20"
              defaultValue=""
              onChange={pwChange}
              ref={pwCkRef}
              placeholder="변경할 비밀번호를 다시 한 번 입력하세요"
            />
            <p className="alert">{pwComment}</p>
          </div>
        ) : (
          <div></div>
        )}
        <br />
        <p className="nickname">닉네임</p>
        <input
          className="nick"
          type="text"
          name="nick"
          size="20"
          // defaultValue={user_nick}
          ref={nickRef}
          onChange={nickChange}
          placeholder={nickMsg}
        />
        <p className="alert">{nickComment}</p>
        <input
          className="modify_insert"
          type="button"
          value="수정"
          onClick={handleModify}
        />
      </form>
    </div>
  );
};

export default ModifyInfo;
