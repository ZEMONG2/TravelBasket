import { FiMenu } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useState, useEffect, useRef } from "react";
import React from "react";
import "../css/Header.scss";
import logo from "../img/logo.png";

const Header = () => {
  // const [menu, setMenu] = useState(false);

  // const toggleMenu = () => {
  //   setMenu((menu) => !menu); // on,off 개념 boolean
  // };

  /* 메뉴 버튼 활성화 */
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
          onClick={() => handleToggleOption()}
        >
          <FiMenu className="icon" />
        </button>
        {/* 로고 */}
        <img className="logo" alt="TRAVEL BASKET" src={logo} />

        {/* 로그인 버튼*/}
        <button
          ref={loginBtnRef}
          className="Login"
          onClick={() => handleToggleOption2()}
        >
          <CgProfile className="icon" />
        </button>
      </div>
      {/* 메뉴 리스트 */}
      <div ref={menuRef} className="menuWrap">
        <ul className={menu ? "show-menu" : "hide-menu"}>
          <li>일정 만들기</li>
          <li>일정 보관함</li>
          <hr />
          <li>
            <a href="/review">후기 게시판</a>
          </li>
          <li>
            <a href="/schedule">일정 공유 게시판</a>
          </li>
        </ul>
      </div>
      {/* 로그인 리스트 */}
      <div ref={loginRef} className="loginWrap">
        <ul className={login ? "show-login" : "hide-login"}>
          <li>
            <a href="/basket">장바구니</a>
          </li>
          <br />
          <li>회원정보 수정</li>
          <li>로그아웃</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;

// https://devilfront.tistory.com/83
//https://velog.io/@bisari31/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%99%B8%EB%B6%80-%EC%98%81%EC%97%AD-%ED%81%B4%EB%A6%AD%EC%8B%9C-%EB%8B%AB%EA%B8%B0
//https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
