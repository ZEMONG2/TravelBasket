import { FiMenu, FiMeh, FiSmile } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import React from "react";
import "../css/main_css/Header.scss";
import logo from "../img/NEXTRAVEL_b.png";
import logo_v from "../img/NEXTRAVEL_v.png";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 로그아웃시 세션 초기화
  const logout = () => {
    window.sessionStorage.clear();
    console.log("세션초기화");

    setLogin((prev) => !prev);
    navigate("/");
  };

  // 회원정보 이동
  const modifyInfo = () => {
    handleToggleOption2();
    navigate("/modify");
  };

  /* 메뉴 버튼 활성화 
    -  메뉴리스트는 menu가 true 일 때 보이게됨
    -  초기값은 false이며, 클릭시 true
    -  useEffect : 마우스 클릭시 handleClickOutSide 함수 실행
    -  addEventListener : 지정한 유형의 이벤트를 대상이 수신할 때마다 호출할 함수 설정
    -  removeEventListener : 이벤트 대상에 등록된 수신기 제거
    -  mousedown : 마우스 버튼이 클릭되기 시작할 때 */

  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);
  const [menu, setMenu] = useState(false);
  const handleToggleOption = () => setMenu((prev) => !prev);

  const handleClickOutSide = (e) => {
    console.log(menuRef.current.contains(e.target));
    if (
      menu &&
      !menuRef.current.contains(e.target) &&
      !menuBtnRef.current.contains(e.target)
    ) {
      setMenu(false);
    }
  };

  useEffect(() => {
    if (menu) document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  });

  /* 로그인 버튼 활성화 */
  const loginRef = useRef(null);
  const loginBtnRef = useRef(null);
  const [login, setLogin] = useState(false);
  const handleToggleOption2 = () => setLogin((prev) => !prev);

  const handleClickOutSide2 = (e) => {
    console.log(loginRef.current.contains(e.target));
    if (
      login &&
      !loginRef.current.contains(e.target) &&
      !loginBtnRef.current.contains(e.target)
    ) {
      setLogin(false);
    }
  };

  useEffect(() => {
    if (login) document.addEventListener("mousedown", handleClickOutSide2);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide2);
    };
  });

  return (
    <div className="header">
      <div className="item">
        {/* 메뉴 버튼*/}
        <button
          ref={menuBtnRef}
          className="Menu"
          onClick={() =>
            // 메뉴버튼 로그인시 이용가능
            window.sessionStorage.length === 0
              ? alert("로그인후 이용해주세요")
              : handleToggleOption()
          }
        >
          <FiMenu className="icon" />
        </button>
        {/* 로고 */}
        <a href="/">
          <img className="logo" alt="NEXT TRAVEL" src={logo} />
        </a>
        {/* 로그인 버튼*/}
        <button
          ref={loginBtnRef}
          className="Login"
          onClick={() => {
            console.log(window.sessionStorage.length);
            window.sessionStorage.length === 0
              ? navigate("/login")
              : handleToggleOption2();
          }}
        >
          {/* 로그인 여부에 따른 이모티콘 변경 */}
          <div>
            {window.sessionStorage.getItem("USER_NICK") ? (
              <FiSmile className="icon" />
            ) : (
              <FiMeh className="icon" />
            )}
          </div>
        </button>
      </div>
      {/* 메뉴 리스트 */}
      <div ref={menuRef} className="menuWrap">
        <ul className={menu ? "show-menu" : "hide-menu"}>
          <li>일정 만들기</li>
          <hr />
          <li>
            <a href="/review">후기 게시판</a>
          </li>
          <li>
            <a href="/schedule">일정 공유 게시판</a>
          </li>
          <img className="logo_v" alt="NEXT TRAVEL" src={logo_v} />
        </ul>
      </div>
      {/* 로그인 리스트 */}
      <div ref={loginRef} className="loginWrap">
        <ul className={login ? "show-login" : "hide-login"}>
          {/* 로그인시 닉네임 */}
          <li>{window.sessionStorage.getItem("USER_NICK")}</li>
          <br />
          <li>
            <a href="/basket">장바구니</a>
            <li>일정 보관함</li>
            <li>후기 보관함</li>
            <li>좋아요 보관함</li>
          </li>
          <hr />
          <li onClick={modifyInfo}>회원정보 수정</li>
          <li className="Logout" onClick={logout}>
            로그아웃
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;

/* [토글메뉴 구현] */
// https://devilfront.tistory.com/83
/* [외부 클릭시 메뉴버튼 비활성화] */
// https://velog.io/@bisari31/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%99%B8%EB%B6%80-%EC%98%81%EC%97%AD-%ED%81%B4%EB%A6%AD%EC%8B%9C-%EB%8B%AB%EA%B8%B0
// https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
