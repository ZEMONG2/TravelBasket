import { FiMenu, FiMeh, FiSmile } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import '../Header/header_css/Header.scss';
import logo from '../../img/NEXTRAVEL.png';
import logo_v from '../../img/NEXTRAVEL_v.png';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 로그아웃시 세션 초기화
  const logout = () => {
    window.sessionStorage.clear();
    console.log('세션초기화');

    setLogin((prev) => !prev);
    navigate('/');
  };

  // 메인 이동
  const pathname = window.location.pathname;
  // console.log(window.location.pathname);
  // console.log(pathname);
  // const main = () => {
  //   navigate('/');
  // };
  // ==================================
  //  좌측 메뉴 이동
  // ==================================

  // 일정 만들기 이동
  const makeplan = () => {
    handleToggleOption();
    navigate('/makeplan');
  };

  // 후기 게시판 이동
  const board = () => {
    handleToggleOption();
    navigate('/review');
  };

  // 일정공유 게시판 이동
  const schedule_board = () => {
    handleToggleOption();
    navigate('/schedule_board');
  };

  // 220902 선우 이용안내 이동
  const howtouse = () => {
    handleToggleOption();
    navigate('/howtouse');
  };

  // ABOUT 페이지 이동
  const about = () => {
    handleToggleOption();
    navigate('/about');
  };

  // ==================================
  //  우측 메뉴 이동
  // ==================================

  // 장바구니 이동
  const basket = () => {
    handleToggleOption2();
    navigate('/basket');
  };

  // 내 일정 보관함 이동
  const schedule = () => {
    handleToggleOption2();
    navigate('/schedule');
  };

  // 후기 보관함 이동
  const reviewStorage = () => {
    handleToggleOption2();
    navigate('/storage/review');
  };

  // 좋아요 보관함 이동
  // ㄴ> 일정 좋아요, 후기 좋아요 누른거 보관...?
  const likeStorage = () => {
    handleToggleOption2();
    navigate('/storage/like');
  };

  // 회원정보 수정 이동
  const modifyInfo = () => {
    handleToggleOption2();
    navigate('/modify');
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
    console.log('메뉴 => ', menuRef.current.contains(e.target));
    if (
      menu &&
      !menuRef.current.contains(e.target) &&
      !menuBtnRef.current.contains(e.target)
    ) {
      setMenu(false);
    }
  };

  useEffect(() => {
    if (menu) document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
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
    if (login) document.addEventListener('mousedown', handleClickOutSide2);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide2);
    };
  });

  // /* 블라인드 활성화 */
  const blindRef = useRef(null);
  const [blind, setBlind] = useState(false);

  return (
    <>
      <div className="header">
        <div className="item">
          {/* 메뉴 버튼*/}
          <button
            ref={menuBtnRef}
            className="Menu"
            onClick={() =>
              // 메뉴버튼 로그인시 이용가능
              window.sessionStorage.length === 0
                ? alert('로그인후 이용해주세요')
                : handleToggleOption()
            }
          >
            <FiMenu className="icon" />
          </button>
          {/* 로고 */}
          <img
            className="logo"
            alt="NEXT TRAVEL"
            src={logo}
            onClick={() =>
              pathname == '/' ? window.location.reload() : navigate('/')
            }
            // onClick={main}
          />
          {/* 로그인 버튼*/}
          <button
            ref={loginBtnRef}
            className="Login"
            onClick={() => {
              console.log(window.sessionStorage.length);
              window.sessionStorage.length === 0
                ? navigate('/login')
                : handleToggleOption2();
            }}
          >
            {/* 로그인 여부에 따른 이모티콘 변경 */}
            <div>
              {window.sessionStorage.getItem('USER_NICK') ? (
                <FiSmile className="icon" />
              ) : (
                <FiMeh className="icon" />
              )}
            </div>
          </button>
        </div>
        {/* 메뉴 리스트 */}
        <div ref={menuRef} className="menuWrap">
          <ul className={menu ? 'show-menu' : 'hide-menu'}>
            <li onClick={makeplan}>일정 만들기</li>
            {/* <hr /> */}
            <li onClick={board}>후기 게시판</li>
            <li onClick={schedule_board}>일정 공유 게시판</li>
            <br />
            <li onClick={howtouse}>이용방법</li>
            <li onClick={about}>NEXTRAVEL 소개</li>
            <img className="logo_v" alt="NEXT TRAVEL" src={logo_v} />
          </ul>
        </div>
        {/* 로그인 리스트 */}
        <div ref={loginRef} className="loginWrap">
          <ul className={login ? 'show-login ' : 'hide-login '}>
            {/* 로그인시 닉네임 */}
            <li className="menu_nick">
              {window.sessionStorage.getItem('USER_NICK')}
            </li>
            <br />
            <li onClick={basket}>장바구니</li>
            <li onClick={schedule}>내 일정 보관함</li>
            <li onClick={reviewStorage}>후기 보관함</li>
            <li onClick={likeStorage}>좋아요 보관함</li>
            {/* <hr /> */}
            <br />
            <li onClick={modifyInfo}>회원정보 수정</li>
            <li className="Logout" onClick={logout}>
              로그아웃
            </li>
          </ul>
        </div>
      </div>
      <div className={menu || login ? 'show-blind' : 'hide-blind'}></div>
    </>
  );
};

export default Header;

/* [토글메뉴 구현] */
// https://devilfront.tistory.com/83
/* [외부 클릭시 메뉴버튼 비활성화] */
// https://velog.io/@bisari31/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%99%B8%EB%B6%80-%EC%98%81%EC%97%AD-%ED%81%B4%EB%A6%AD%EC%8B%9C-%EB%8B%AB%EA%B8%B0
// https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
