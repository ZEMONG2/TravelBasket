
import React, { useState, useCallback, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { blogSearch } from "./api";
import Item from "./MainItem";
import Pagination from "react-js-pagination";
import "../css/main_css/Main.scss";
import MainuseInterval from "./MainuseInterval";
import { useDispatch } from "react-redux";
// import { useDispatch } from "react-redux";

// 토글 메뉴 CSS / 코드가 긴것들은 SCSS 참고
const MenuIcon = styled.div`
  .menu-btnf {
    font-size: 15px;
    font-weight: bold;
    float: center;
    padding: 10px;
    border-radius: 1px;
  }
  .show-menu {
    width: 300px;
    height: 500px;
    position: absolute;
    left: 0px;
    transition: 1s;
  }

  .hide-menu {
    width: 300px;
    height: 500px;
    position: absolute;
    left: -150px;
    transition: 1s;
  }
  .user-btnf {
    font-size: 15px;
    font-weight: bold;
    float: right;
    padding: 10px;
    border-radius: 1px;
  }

  .show-user {
    width: 200px;
    height: 500px;
    position: absolute;
    right: -90px;
    transition: 1s;
  }

  .hide-user {
    width: 200px;
    height: 500px;
    position: absolute;
    right: -240px;
    transition: 1s;
  }
`;

// 슬라이드 및 슬라이드 넘기기 좌우버튼 css

const defaultButtonStyle = css`
  position: absolute;
  top: calc(47% - 85px);
  padding: 50px;
  width: 50px;
  height: 30px;
  line-height: 1;
  border: none;
  border-radius: 50%;
  background: none;
  outline: none;
  cursor: pointer;
  display: block;
`;

const PrevButton = styled.button`
  ${defaultButtonStyle}
  left: 220PX;
`;

const NextButton = styled.button`
  ${defaultButtonStyle}
  right: 260PX;
`;

const defaultIconStyle = css`
  font-size: 22px;
  color: #dedede;

  &:focus,
  &:hover {
    color: purple;
  }
`;

// 검색창 CSS

const CssSearch = styled.div`
  .input_search {
    display: flex;
    margin: 0 auto;
    margin-top: 50px;
    padding: 10px;
  }

  .search_btn {
    display: flex;
    margin: 0 auto;
    margin-right: 240px;
    padding: 10px;
    margin-top: -40px;
  }
`;

const Aniart = styled.div`
  .Introduce {
    margin: 5px;
    text-align: center;
    color: azure;
    font-size: 1.1vw;
    margin-top: 25px;
    height: 1px;
  }
`;

// const PrevIcon = styled(LeftOutlined)`
//   ${defaultIconStyle}
// `;

// const NextIcon = styled(RightOutlined)`
//   ${defaultIconStyle}
// `;

// 객체 한글자씩 호출되는 리스트&코드
const OPTION = {
  writeArr: [],
  arrIndex: 0,
  index: 0,
};
const WORD_TYPING_SPEED = 400;
const msgArr = ["TravelBasket★"]; // 객체 하나씩 추가하면 한줄씩 내려감
// ======= 220823 선우 병합
// import React from 'react';
// >>>>>>> 220822_선우_branch

const Main = () => {
  const [isOpen, setMenu] = useState(false); // 메뉴 초기값 false
  const [userOpen, setUser] = useState(false); // 유저메뉴 초기값 false

  // const [mp, setmp] = useState(true);
  // setmp(false);

  const toggleMenu = () => {
    setMenu((isOpen) => !isOpen); // on,off
  };

  const toggleuser = () => {
    setUser((userOpen) => !userOpen); // on,off
  };

  const slickRef = useRef(null); // 슬라이드 좌우 버튼 ref로 제어

  const settings = {
    // 슬라이드 기본 제공 코드 함수형으로 전환
    arrow: true, // 화살표 표시
    dots: true, // 밑에 현재 페이지와 나머지 페이지 점으로 표시
    infinite: true, // 무한 반복
    speed: 600, // 넘기는 속도
    slidesToShow: 1, // 슬라이드에 보여지는 아이템 개수
    slidesToScroll: 1, // 슬라이드 넘기는 아이템 개수
    vertical: false, // 스크롤 가로세로 모드 온오프
    autoplay: true, // 자동 재생
    autoplaySpeed: 5000, // 자동 재생 속도
    centerMode: true,
    centerPadding: "0px", // 0px = 슬라이드 끝쪽 이미지 안잘림
    // cssEase: "linear",
  };

  const previous = useCallback(() => slickRef.current.slickPrev(), []);
  const next = useCallback(() => slickRef.current.slickNext(), []);

  // 검색기능
  const [blogs, setBlogs] = useState([]); // 보여줄 포스트
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.length > 0) {
      blogSearchHttp(query, true);
    } // 컴포넌트 마운트 후 함수를 호출
  }, [query]);

  // 엔터 눌렀을 때 호출
  const onEnter = (e) => {
    if (e.keyCode === 13) {
      setQuery(text);
    }
  };

  // text 검색어 바뀔 때 호출
  const onTextUpdate = (e) => {
    setText(e.target.value);
  };

  // 검색버튼 눌렀을때 호출
  const onClick = (e) => {
    setQuery(text);
  };

  // blog search 핸들러
  const blogSearchHttp = async (query, reset) => {
    // paramter 설정
    const params = {
      query: query,
      sort: "accuracy", // accuracy | recency (정확도 or 최신)
      page: 1, // 페이지번호
      size: 50, // 검색 할 문서 갯수
    };

    const { data } = await blogSearch(params); // api 호출
    if (reset) {
      setBlogs(data.documents);
    } else {
      setBlogs(blogs.concat(data.documents));
    }
    console.log(data); // 결과 호출
  };

  // 검색결과 다중 페이지 구현
  const [page, setPage] = useState(1);
  const [list, setList] = useState(3);

  const handlePageChange = (page) => {
    setPage(page);
    console.log(page);
  };

  const itemChange = (e) => {
    setList(Number(e.target.value));
  };

  // 객체 한글자 자동 입력 호출
  const [introduce, setIntroduce] = useState([]);

  const onChangeMsg = (o) => {
    const msg = msgArr[o.arrIndex];
    o.writeArr[o.arrIndex] = msg.substring(0, ++o.index);
    if (o.index > msg.length) {
      o.index = 0;
      if (++o.arrIndex >= msgArr.length) {
        o.arrIndex = 0;
        o.writeArr.splice(0, o.writeArr.length);
      }
    }
    setIntroduce(() => [...o.writeArr]);
  };

  MainuseInterval(() => {
    onChangeMsg(OPTION);
  }, WORD_TYPING_SPEED);

  // 장바구니 추가 (일단 임시로 입력)
  const [orders, setOrders] = useState([]);

  // [{isbn, quantity : 1}]
  const addToOrder = useCallback((isbn) => {
    setOrders((orders) => {
      // 동일한 항목을 추가할 땐 2개, 3개로 변경해주기 위해 동일한 isbn가 있는지 검사
      const finded = orders.find((order) => order.isbn === isbn);
      // 장바구니에 중복이 없으면 quantity에 1을 넣어줌
      if (finded === undefined) {
        return [...orders, { isbn, quantity: 1 }];
      } // 동일한 항목이 있으면
      else {
        return orders.map((order) => {
          if (order.isbn === isbn) {
            return {
              isbn,
              quantity: order.quantity + 1,
            };
          } else {
            return order;
          }
        });
      }
    });
  }, []);

  // const dispatch = useDispatch();

  return (
    <div className="main">
      <MenuIcon>
        <button
          type="button"
          className="menu-btnf"
          onClick={() => toggleMenu()}
        >
          <p className="menu-btnffont">Menu</p>
        </button>
        <ul className={isOpen ? "show-menu" : "hide-menu"}>
          <li>여행지 찾기</li>
          <li>후기 게시판</li>
          <li>일정 공유 게시판</li>
          <li>공지사항</li>
          <li>장바구니</li>
          <li>일정 만들기</li>
          <li>일정 보관함</li>
        </ul>
        <button
          type="button"
          className="user-btnf"
          onClick={() => toggleuser()}
        >
          <p className="user-btnffont">User</p>
        </button>
        <ul className={userOpen ? "show-user" : "hide-user"}>
          <li>회원정보 수정</li>
          <li>로그아웃</li>
        </ul>
      </MenuIcon>
      <h1 className="slider_title">풀슬라이드 반응형 홈페이지 여행 제목</h1>
      <Slider ref={slickRef} {...settings}>
        <div className="card-wrapper">
          <div className="card">
            <div className="card-image">
              <img src="images/1.jpg" />
            </div>
            <div className="details">
              <h2>
                대충 풀슬라이드 반응형
                <span className="job-title">좌우버튼 구현</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="card-wrapper">
          <div className="card">
            <div className="card-image">
              <img src="images/2.png" />
            </div>
            <div className="details">
              <h2>
                대충 풀슬라이드 반응형
                <span className="job-title">
                  이미지에 마우스 누르고 슬라이드로 넘기기 가능
                </span>
              </h2>
            </div>
          </div>
        </div>
        <div className="card-wrapper">
          <div className="card">
            <div className="card-image">
              <img src="images/3.png" />
            </div>
            <div className="details">
              <h2>
                대충 풀슬라이드 반응형
                <span className="job-title">
                  이미지만 보이다가 마우스 드롭시 글 보이게
                </span>
              </h2>
            </div>
          </div>
        </div>
        <div className="card-wrapper">
          <div className="card">
            <div className="card-image">
              <img src="images/4.jpg" />
            </div>
            <div className="details">
              <h2>
                대충 풀슬라이드 반응형
                <span className="job-title">자동넘기기 마우스 대면 멈춤</span>
              </h2>
            </div>
          </div>
        </div>
      </Slider>
      <>
        <PrevButton onClick={previous}>
          <span className="hidden">◀◀◀</span>
        </PrevButton>
        <NextButton onClick={next}>
          <span className="hidden">▶▶▶</span>
        </NextButton>
      </>

      <Aniart>
        <div id="introduce" className="Introduce">
          <h2 className="introduce_msg">
            {introduce.map((m, i) =>
              msgArr[i].length === m.length ? (
                <div key={i}>{m}</div>
              ) : (
                <div key={i}>{m}</div>
              )
            )}
          </h2>
        </div>
      </Aniart>

      <div className="search_a">
        <CssSearch>
          <div className="container">
            <input
              type="search"
              placeholder="검색어를 입력 하세요"
              name="query"
              className="input_search"
              onKeyDown={onEnter}
              onChange={onTextUpdate}
              value={text}
            />
            <button type="button" className="search_btn" onClick={onClick}>
              검색
            </button>
          </div>
        </CssSearch>

        {query.length > 0 && (
          <select className="pagecount" onChange={itemChange}>
            <option value="1">페이지 글 1개</option>
            <option value="3">페이지 글 3개</option>
            <option value="5">페이지 글 5개</option>
          </select>
        )}

        <div>
          {query.length === 0 &&
            "검색어 길이값이 0일때만 나타나는 초기 화면 (구분을 위한 임시문구) "}
        </div>

        <ul className="Blog">
          {blogs
            .slice(list * (page - 1), list * (page - 1) + list)
            .map((blog, index) => (
              <Item
                key={index}
                thumbnail={blog.thumbnail}
                title={blog.title}
                blogname={blog.blogname}
                contents={blog.contents}
                url={blog.url}
                datetime={blog.datetime}
                button={blog.button}
              />
            ))}

          {query.length > 0 && (
            <Pagination
              activePage={page}
              itemsCountPerPage={list}
              totalItemsCount={blogs.length - 1}
              pageRangeDisplayed={5}
              prevPageText={"<-"}
              nextPageText={"->"}
              firstPageText={"Frist"}
              lastPageText={"Last"}
              onChange={handlePageChange}
            />
          )}
        </ul>
      </div>
    </div>
  );
};

export default Main;

// 페이징 셋팅
// activePage={page}
// itemsCountPerPage=총 페이지 수
// totalItemsCount=총 게시글의 개수
// pageRangeDisplayed=표시되는 페이지 범위
// prevPageText={"<-"}
// nextPageText={"->"}
// firstPageText={"Frist"}
// lastPageText={"Last"}
// onChange=페이지 버튼을 눌렀을 때 일어나는 이벤트 이를 이용해 페이지 증감

// MainPaging
//         totalCount={posts.length}
//         page={page}
//         postPerPage={postPerPage}
//         pageRangeDisplayed={5}
//         handlePageChange={handlePageChange}

// {RandomIndex(Randoms.length)}

// 라디오 (안넣을듯)

// <div className="radios">
//       <label>
//         <input
//           type="radio"
//           id="kakao"
//           value={"kakao"}
//           name="view"
//           checked={radiocheck === "kakao"}
//           onChange={handleClickRadioButton}
//         />
//         KaKao
//       </label>
//       <label>
//         <input
//           type="radio"
//           id="instar"
//           value={"instar"}
//           name="view"
//           checked={radiocheck === "instar"}
//           onChange={handleClickRadioButton}
//         />
//         instar
//       </label>
//     </div>

// 2. 문자

//RandomStringUtils.random(10, true, false);

//RandomStringUtils.randomAlphabetic(10);

//슬라이드 안 링크 아이콘 생성 코드
// <ul className="social-icons">
// <li><a href="#"><i className="fa fa-facebook"></i></a></li>
// <li><a href="#"><i className="fa fa-instagram"></i></a></li>
// <li><a href="#"><i className="fa fa-twitter"></i></a></li>
// <li><a href="#"><i className="fa fa-dribbble"></i></a></li>
// </ul>
