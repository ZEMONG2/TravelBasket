import React, { useState, useCallback, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { blogSearch } from "./api";
import Item from "./MainItem";
import Pagination from "react-js-pagination";
import "../css/main_css/Main.scss";
import { useDispatch } from "react-redux";
import test from "../img/test.jpg";
import test1 from "../img/test1.jpg";
import test2 from "../img/test2.jpg";
import test3 from "../img/test3.jpg";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const Main = () => {
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

  const slickRef = useRef(null); // 슬라이드 좌우 버튼 ref로 제어

  const back = useCallback(() => slickRef.current.slickPrev(), []);
  const forward = useCallback(() => slickRef.current.slickNext(), []);

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

  return (
    <div className="main">
      <div className="carousel">
        <Slider ref={slickRef} {...settings}>
          <div className="card-wrapper">
            <div className="card">
              <div className="card-image">
                <img src={test} />
              </div>
              <div className="details">
                <h2>슬라이드 1</h2>
              </div>
            </div>
          </div>
          <div className="card-wrapper">
            <div className="card">
              <div className="card-image">
                <img src={test1} />
              </div>
              <div className="details">
                <h2>슬라이드 2</h2>
              </div>
            </div>
          </div>
          <div className="card-wrapper">
            <div className="card">
              <div className="card-image">
                <img src={test2} />
              </div>
              <div className="details">
                <h2>슬라이드 3</h2>
              </div>
            </div>
          </div>
          <div className="card-wrapper">
            <div className="card">
              <div className="card-image">
                <img src={test3} />
              </div>
              <div className="details">
                <h2>슬라이드 4</h2>
              </div>
            </div>
          </div>
        </Slider>
      </div>

      <div className="move_btn">
        <button onClick={back}>
          <IoIosArrowDropleft className="left" />
        </button>
        <button onClick={forward}>
          <IoIosArrowDropright className="right" />
        </button>
      </div>

      <div className="search_a">
        <div className="container">
          <input
            type="search"
            placeholder="🔎 검색어를 입력 하세요"
            name="query"
            className="input_search"
            onKeyDown={onEnter}
            onChange={onTextUpdate}
            value={text}
          />
        </div>

        {query.length > 0 && (
          <select className="pageCount" onChange={itemChange}>
            <option value="3">페이지 글 3개</option>
            <option value="5">페이지 글 5개</option>
            <option value="10">페이지 글 10개</option>
          </select>
        )}

        <div>{query.length === 0 && "검색 전 "}</div>

        {query.length > 0 && (
          <ul className="Blog">
            {blogs
              .slice(list * (page - 1), list * (page - 1) + list)
              .map((blog, index) => (
                <Item
                  key={index}
                  thumbnail={blog.thumbnail}
                  title={blog.title}
                  blogName={blog.blogname}
                  contents={blog.contents}
                  url={blog.url}
                  dateTime={blog.datetime.toString().split("T")[0]}
                  button={blog.button}
                />
              ))}

            <Pagination
              activePage={page}
              itemsCountPerPage={list}
              totalItemsCount={blogs.length - 1}
              pageRangeDisplayed={5}
              prevPageText={"<"}
              nextPageText={">"}
              firstPageText={"<<"}
              lastPageText={">>"}
              onChange={handlePageChange}
            />
          </ul>
        )}
      </div>
    </div>
  );
};

export default Main;
