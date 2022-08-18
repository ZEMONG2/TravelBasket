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

  return (
    <div className="header">
      <div className="item">
        <button
          ref={menuBtnRef}
          className="Menu"
          onClick={() => handleToggleOption()}
        >
          <FiMenu className="icon" />
        </button>
        <img className="logo" alt="TRAVEL BASKET" src={logo} />
        <a href="/login">
          <CgProfile className="icon" />
        </a>
      </div>
      <div ref={menuRef} className="menuWrap">
        <ul className={menu ? "show-menu" : "hide-menu"}>
          <li>
            <a href="/basket">장바구니</a>
          </li>
          <li>일정 만들기</li>
          <li>일정 보관함</li>
          <hr />
          <li>
            <a href="/review">후기 게시판</a>
          </li>
          <li>
            <a href="/schedule">일정 공유 게시판</a>
          </li>
          <hr />
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
