import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Forgot = () => {
  const [emailData, setEmailData] = useState('');
  const [infoCk, setInfoCk] = useState(false);
  const [changePw, setChangePw] = useState(false);
  const [randomNum, setRandomNum] = useState({
    secretNum: '',
  });
  const newPassword1Ref = useRef();
  const newPassword2Ref = useRef();
  const secretNumRef = useRef();
  const nickRef = useRef();
  const emailRef = useRef();
  const navigate = useNavigate();

  // 이메일 정규표현식 확인
  const emailCheck = (emailData) => {
    var REGEXP =
      /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;
    return REGEXP.test(emailData);
  };

  const _searchPassword = () => {
    const user_nick = nickRef.current.value;
    const user_email = emailRef.current.value;
    // 닉네임 입력 확인
    if (nickRef.current.value === '' || nickRef.current.value === undefined) {
      alert('닉네임을 입력하세요!!!');
      nickRef.current.focus();
      return false;
    }
    // 이메일 입력 확인
    if (
      emailRef.current.value === '' ||
      emailRef.current.value === undefined ||
      !emailCheck(emailRef.current.value)
    ) {
      alert('가입하신 이메일을 입력하세요!!!');
      emailRef.current.focus();
      return false;
    }
    axios
      .post('http://localhost:8000/forgot/pw', {
        nick: user_nick,
        id: user_email,
      })
      .then((res) => {
        // 입력한 정보와 동일한 사용자가 없으면
        if (res.data === false) {
          alert('존재하지 않는 회원입니다');
          nickRef.current.value = '';
          emailRef.current.value = '';
        } else {
          // 회원정보가 존재하면 비밀번호 찾기 이메일 발송
          setInfoCk(true);
          setEmailData(user_email);
          alert(user_email + '의 주소로 \n6자리의 숫자코드가 수신되었습니다.');
          setRandomNum({ secretNum: res.data.secret });
          nickRef.current.value = '';
          emailRef.current.value = '';
        }
        console.log('jjjj====', randomNum.secretNum);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  console.log('tttt===', infoCk);

  const checkSecretCode = () => {
    const secret_code = randomNum.secretNum;
    const secret_input = secretNumRef.current.value;
    console.log('oooo====', secretNumRef.current.value);
    console.log('qqqq====', secret_input);
    if (secret_input.length !== 6) {
      return alert('6자리의 숫자코드를 입력해주세요.');
    } else if (secret_code !== secret_input) {
      return alert('숫자코드가 일치하지 않습니다.');
    }
    return setChangePw(true);
  };

  const resetState = () => {
    setInfoCk(false);
    setChangePw(false);
  };

  const passwordChange = () => {
    const newPw1 = newPassword1Ref.current.value;
    const newPw2 = newPassword2Ref.current.value;
    console.log('nnnn====', newPw1);
    console.log('hhhh====', newPw2);
    // 패스워드 입력 확인
    if (
      newPassword1Ref.current.value === '' ||
      newPassword1Ref.current.value === undefined
    ) {
      alert('패스워드를 입력하세요!!!');
      newPassword1Ref.current.focus();
      return false;
    }
    // 패스워드체크 입력 확인
    if (
      newPassword2Ref.current.value === '' ||
      newPassword2Ref.current.value === undefined
    ) {
      alert('패스워드를 한번더 입력하세요!!!');
      newPassword2Ref.current.focus();
      return false;
    }
    // 비밀번호 와 비밀번호 체크 값 비교
    if (newPassword1Ref.current.value !== newPassword2Ref.current.value) {
      alert('비밀번호가 서로 다릅니다!!!');
      newPassword2Ref.current.focus();
      return false;
    }

    axios
      .post('http://localhost:8000/forgot/pwChange', { emailData, newPw1 })
      .then((res) => {
        if (res.data == '비밀번호 수정 성공') {
          alert('비밀번호 수정 성공');
          navigate('/login');
        } else {
          alert('비밀번호 수정 실패');
          resetState();
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      {!infoCk ? (
        <div>
          <div>
            <h1>비밀번호 찾기</h1>
            <p className="pw_search"> 닉네임 </p>
            <input
              class="nick"
              type="text"
              ref={nickRef}
              placeholder="닉네임을 입력해주세요"
            />
          </div>

          <div>
            <p className="pw_search"> 이메일 </p>
            <input
              class="id"
              type="email"
              ref={emailRef}
              placeholder="인증받을 이메일을 입력해주세요"
            />
          </div>

          <div>
            <input
              className="sign_up"
              type="button"
              value="조회하기"
              onClick={_searchPassword}
            />
          </div>
        </div>
      ) : !changePw ? (
        <div>
          <h4> 비밀번호 찾기 </h4>
          <div>
            <p>
              <b>{emailData}</b> 이메일 주소로 <br />
              전송된 6자리 숫자코드를 입력해주세요.
            </p>

            <input
              type="text"
              maxLength="6"
              placeholder="6자리 숫자코드 입력"
              ref={secretNumRef}
            />
            <input type="button" value="확인" onClick={checkSecretCode} />
          </div>
        </div>
      ) : (
        <div>
          <div>
            <div>
              <h5> 비밀번호 </h5>
              <span>변경할 비밀번호를 입력하세요</span>
              <input type="password" ref={newPassword1Ref} />
            </div>

            <div>
              <h5> 비밀번호 확인 </h5>
              <span>변경할 비밀번호를 한번 더 입력하세요</span>
              <input type="password" ref={newPassword2Ref} />
            </div>

            <input
              type="button"
              value="비밀번호 변경"
              onClick={passwordChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Forgot;
