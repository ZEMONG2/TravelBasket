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
import test from "../img/test.jpg";
import test1 from "../img/test1.jpg";
import test2 from "../img/test2.jpg";
import test3 from "../img/test3.jpg";

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

// 객체 한글자씩 호출되는 리스트&코드
const OPTION = {
  writeArr: [],
  arrIndex: 0,
  index: 0,
};
const WORD_TYPING_SPEED = 400;
const msgArr = ["TravelBasket★"]; // 객체 하나씩 추가하면 한줄씩 내려감

const Main = () => {
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
      <Slider ref={slickRef} {...settings}>
        <div className="card-wrapper">
          <div className="card">
            <div className="card-image">
              <img src={test} />
            </div>
            <div className="details">
              <h2>
                슬라이드 1<span className="job-title">내용 1</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="card-wrapper">
          <div className="card">
            <div className="card-image">
              <img src={test1} />
            </div>
            <div className="details">
              <h2>
                슬라이드 2<span className="job-title">내용 2</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="card-wrapper">
          <div className="card">
            <div className="card-image">
              <img src={test2} />
            </div>
            <div className="details">
              <h2>
                슬라이드 3<span className="job-title">내용 3</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="card-wrapper">
          <div className="card">
            <div className="card-image">
              <img src={test3} />
            </div>
            <div className="details">
              <h2>
                슬라이드 4<span className="job-title">내용 4</span>
              </h2>
            </div>
          </div>
        </div>
      </Slider>
      <>
        <PrevButton onClick={previous}></PrevButton>
        <NextButton onClick={next}></NextButton>
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
