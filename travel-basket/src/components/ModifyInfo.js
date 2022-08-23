import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/main_css/ModifyInfo.scss";

const ModifyInfo = () => {
  const idRef = useRef();
  const pwRef = useRef();
  const pwCkRef = useRef();
  const nickRef = useRef();
  const [nickComment, setNickComment] = useState("");
  const user_id = window.sessionStorage.getItem("USER_ID");
  const user_nick = window.sessionStorage.getItem("USER_NICK");
  const join_path = window.sessionStorage.getItem("JOIN_PATH");
  // 페이지 이동 navigate
  const navigate = useNavigate();
  // 닉네임 중복 체크
  var nick = "";
  const nickChange = (e) => {
    nick = nickRef.current.value;
    axios.post("http://localhost:8000/nickCheck", { nick }).then((res) => {
      setNickComment("");
      if (res.data[0].CNT !== 0) {
        setNickComment("중복된 닉네임이 있습니다.");
      } else {
        setNickComment("");
      }
    });
  };

  // 회원가입 버튼 클릭시 실행 함수
  const handleModify = () => {
    if (join_path === "LOCAL") {
      // 패스워드 입력 확인
      if (pwRef.current.value === "" || pwRef.current.value === undefined) {
        alert("패스워드를 입력하세요!!!");
        pwRef.current.focus();
        return false;
      }
      if (pwCkRef.current.value === "" || pwCkRef.current.value === undefined) {
        // 패스워드체크 입력 확인
        alert("패스워드를 한번더 입력하세요!!!");
        pwCkRef.current.focus();
        return false;
      }
      // 비밀번호 와 비밀번호 체크 값 비교
      if (pwRef.current.value !== pwCkRef.current.value) {
        alert("비밀번호가 서로 다릅니다!!!");
        pwCkRef.current.focus();
        return false;
      }
    }

    // 닉네임 입력 확인
    if (nickRef.current.value === "" || nickRef.current.value === undefined) {
      alert("닉네임을 입력하세요!!!");
      pwRef.current.focus();
      return false;
    }

    // 회원정보 수정 요청
    if (join_path === "LOCAL") {
      axios
        .post("http://localhost:8000/modifyInfo", {
          id: idRef.current.value,
          pw: pwRef.current.value,
          nick: nickRef.current.value,
        })
        .then((res) => {
          console.log(res);
          //회원정보수정에 성공하면
          if (res.data === "회원정보수정성공") {
            //로그인 페이지로 이동 (재로그인)
            window.sessionStorage.clear();
            console.log("세션초기화");
            alert("회원정보수정 성공");
            navigate("/login");
          }
        })
        .catch((e) => {
          console.error(e);
        });
    } else if (join_path === "KAKAO") {
      axios
        .post("http://localhost:8000/modifyInfo", {
          id: idRef.current.value,
          pw: "kakao",
          nick: nickRef.current.value,
        })
        .then((res) => {
          console.log(res);
          //회원정보수정에 성공하면
          if (res.data === "회원정보수정성공") {
            //로그인 페이지로 이동 (재로그인)
            window.sessionStorage.clear();
            console.log("세션초기화");
            alert("회원정보수정 성공");
            navigate("/login");
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
      <form>
        <p>아이디</p>
        <input
          className="id"
          type="email"
          name="id"
          size="20"
          value={user_id}
          ref={idRef}
          readOnly
        />
        {join_path === "LOCAL" ? (
          <div>
            <p>비밀번호</p>
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
            <p>비밀번호 확인</p>
            <input
              className="pwck"
              type="password"
              name="pwCk"
              size="20"
              defaultValue=""
              ref={pwCkRef}
              placeholder="패스워드를 한번 더 입력하세요"
            />
          </div>
        ) : (
          <div></div>
        )}
        <p>닉네임</p>
        <p>{nickComment}</p>
        <input
          className="nick"
          type="text"
          name="nick"
          size="20"
          defaultValue={user_nick}
          ref={nickRef}
          onChange={nickChange}
          placeholder="닉네임을 입력하세요"
        />
        <br />
        <input
          className="modify"
          type="button"
          value="회원정보수정"
          onClick={handleModify}
        />
        <br />
      </form>
    </div>
  );
};

export default ModifyInfo;
