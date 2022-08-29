import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Nick = () => {
  // 카카오 로그인시 닉네임 설정 상태값
  const [nickComment, setNickComment] = useState('');

  // 주소에 있는 파람 받아오기
  const params = useParams();

  // 페이지 이동
  const navigate = useNavigate();

  const email = params.id;
  console.log('ck1 ', params);
  var nick = '';
  const nickChange = (e) => {
    nick = e.target.value;
    axios.post('http://localhost:8000/nickCheck', { nick }).then((res) => {
      setNickComment('');
      if (res.data[0].CNT !== 0) {
        setNickComment('중복된 닉네임이 있습니다.');
      } else {
        setNickComment('');
      }
    });
  };

  const nickSend = (e) => {
    console.log('ck2 ', params);
    axios
      .post('http://localhost:8000/nickSend', { nick: nick, email: email })
      .then((res) => {
        if (res.data.length === 1) {
          console.log('idx', res.data[0].USER_IDX);
          console.log('id', res.data[0].USER_ID);
          console.log('nickname', res.data[0].USER_NICK);

          // 로그인에 성공하고 세션에 값 저장
          window.sessionStorage.setItem('USER_ID', res.data[0].USER_ID);
          window.sessionStorage.setItem('USER_NICK', res.data[0].USER_NICK);
          window.sessionStorage.setItem('USER_IDX', res.data[0].USER_IDX);
          window.sessionStorage.setItem('JOIN_PATH', res.data[0].JOIN_PATH);
          console.log('세션 값 있는지 확인 : ', window.sessionStorage);
          console.log(
            '세션 아이디 있는지 확인 : ',
            window.sessionStorage.getItem('USER_ID'),
          );

          // 세션에 값 저장후 메인페이지로 이동
          navigate('/');
        }
      });
  };

  return (
    <div>
      <p>{nickComment}</p>
      <input type="text" id="nick" onChange={nickChange} />
      <button onClick={nickSend}>닉네임 설정</button>
    </div>
  );
};

export default Nick;
