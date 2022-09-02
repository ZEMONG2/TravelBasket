import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { blogSearch } from './API';
import Item from './MainItem';
import Pagination from 'react-js-pagination';
import '../Main/main_css/Main.scss';
import { useDispatch } from 'react-redux';
import test from '../../img/test.jpg';
import test1 from '../../img/test1.jpg';
import test2 from '../../img/test2.jpg';
import test3 from '../../img/test3.jpg';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { Tabs, TabContent, TabLink } from 'react-tabs-redux';

const Main = () => {
  // ====================================================================
  // 슬라이드
  // ====================================================================

  const settings = {
    // 슬라이드 기본 제공 코드 함수형으로 전환
    arrow: true, // 화살표 표시
    dots: true, // 밑에 현재 페이지와 나머지 페이지 점으로 표시
    infinite: true, // 무한 반복
    speed: 500, // 넘기는 속도
    slidesToShow: 1, // 슬라이드에 보여지는 아이템 개수
    slidesToScroll: 1, // 슬라이드 넘기는 아이템 개수
    vertical: false, // 스크롤 가로세로 모드 온오프
    autoplay: true, // 자동 재생
    autoplaySpeed: 4000, // 자동 재생 속도
    centerMode: true,
    centerPadding: '0px', // 0px = 슬라이드 끝쪽 이미지 안잘림
    // cssEase: "linear",
    responsive: [
      // 반응형 웹 구현 옵션
      {
        breakpoint: 1200, // 화면 사이즈 1200px
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const slickRef = useRef(null); // 슬라이드 좌우 버튼 ref로 제어

  // 슬라이드 넘기기 버튼
  const back = useCallback(() => slickRef.current.slickPrev(), []);
  const forward = useCallback(() => slickRef.current.slickNext(), []);

  // ====================================================================
  // 검색창
  // ====================================================================

  // 검색 기능
  const [blogs, setBlogs] = useState([]); // 보여줄 포스트
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query.length > 0) {
      blogSearchHttp(query, true);
    } // 컴포넌트 마운트 후 함수를 호출
  }, [query]);

  // 검색 엔터 눌렀을 때 호출
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
  // const onClick = (e) => {
  //   setQuery(text);
  // };

  // blog search 핸들러
  const blogSearchHttp = async (query, reset) => {
    // parameter 설정
    const params = {
      query: query,
      sort: 'accuracy', // accuracy | recency (정확도 or 최신)
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

  // ====================================================================
  // 장바구니 버튼 (미완성 상태)
  // ====================================================================

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
              <a href="https://me2.do/GSgQ9ONq" target="_blank">
                <div className="card-image">
                  <img src={test} alt="test" />
                </div>
                <div className="details">
                  <h2>차타고 떠나는 대한민국 이색 여행</h2>
                </div>
              </a>
            </div>
          </div>
          <div className="card-wrapper">
            <div className="card">
              <a href="https://me2.do/xhA0cGAM" target="_blank">
                <div className="card-image">
                  <img src={test1} alt="test" />
                </div>
                <div className="details">
                  <h2>여행 취향 테스트</h2>
                </div>
              </a>
            </div>
          </div>
          <div className="card-wrapper">
            <div className="card">
              <a
                href="https://korean.visitkorea.or.kr/wallpaper/main.do"
                target="_blank"
              >
                <div className="card-image">
                  <img src={test2} alt="test" />
                </div>
                <div className="details">
                  <h2>대한민국 풍경 소장하기</h2>
                </div>
              </a>
            </div>
          </div>
          <div className="card-wrapper">
            <div className="card">
              <a href="https://me2.do/5fEhxeM1" target="_blank">
                <div className="card-image">
                  <img src={test3} alt="test" />
                </div>
                <div className="details">
                  <h2>외국 갬성 폭발하는 국내 여행지</h2>
                </div>
              </a>
            </div>
          </div>
        </Slider>
      </div>

      <div className="move_btn1">
        <button onClick={back}>
          <IoIosArrowDropleft className="left_btn" />
        </button>
        <button onClick={forward}>
          <IoIosArrowDropright className="right_btn" />
        </button>
      </div>

      <div className="search_a">
        <div className="container">
          <input
            type="search"
            placeholder="🔎 검색어를 입력하세요"
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

        <div className="search_none">
          {query.length === 0 && (
            <div>
              <div className="tab_all">
                <a
                  className="tab_title"
                  href="https://booking.naver.com/booking/12/bizes/589217"
                  target="_blank"
                >
                  ──　2022 미술에 빠진 대한민국 9.1. - 9.11.　──
                </a>
                <Tabs renderActiveTabContentOnly={true}>
                  <ul className="tab_list">
                    <li className="Main_tab">
                      <TabLink to="tab1" default>
                        #서울
                      </TabLink>
                    </li>
                    <li className="Main_tab">
                      <TabLink to="tab2">#경기·인천</TabLink>
                    </li>
                    <li className="Main_tab">
                      <TabLink to="tab3">#충청·대전·강원</TabLink>
                    </li>
                    <li className="Main_tab">
                      <TabLink to="tab4">#광주·대구</TabLink>
                    </li>
                    <li className="Main_tab">
                      <TabLink to="tab5">#부산·경상·제주</TabLink>
                    </li>
                  </ul>

                  <div className="tab_content">
                    <TabContent for="tab1">
                      <table>
                        <tr>
                          <td>성수</td>
                          <td>테사뮤지엄 → CDA갤러리 → 콜라스트</td>
                        </tr>
                        <tr>
                          <td>소격동</td>
                          <td>
                            금호미술관 → 학고재 갤리러 → 바라캇 컨템포러리
                          </td>
                        </tr>
                        <tr>
                          <td>서촌</td>
                          <td>
                            아트사이드갤러리 → 갤러리 자인제노 → NTL갤러리 →
                            정종미 갤러리 카페
                          </td>
                        </tr>
                        <tr>
                          <td>성북동</td>
                          <td>아트노이트 178 → 17717 → 성북동 연우재</td>
                        </tr>
                        <tr>
                          <td>을지로</td>
                          <td>스페이스카다로그 → 아트코너H → 을지예술센터</td>
                        </tr>
                        <tr>
                          <td>한남</td>
                          <td>
                            현대카드 스토리지 → 아마도예술공간 → 다울랭갤러리
                          </td>
                        </tr>
                        <tr>
                          <td>청담</td>
                          <td>쾨닉 서울 → 장디자인아트 → 송은</td>
                        </tr>
                        <tr>
                          <td>압구정</td>
                          <td>
                            코리나아미술관 → 플랫폼엘 컨템포러리 아트센터 →
                            갤러리로얄
                          </td>
                        </tr>
                      </table>
                    </TabContent>
                    <TabContent for="tab2">
                      <table>
                        <tr>
                          <td>파주 🚌</td>
                          <td>
                            갤러리 박영 → 미메시스 아트 뮤지엄 → 아트센터 화이트
                            블럭
                          </td>
                        </tr>
                        <tr>
                          <td>양주</td>
                          <td>양주시립장욱진미술관 → 펠트체험프로그램</td>
                        </tr>
                        <tr>
                          <td>인천 🚌</td>
                          <td>
                            아트플러그 연수 → 코스모40 → 임시공간 →
                            인천아트플랫폼
                          </td>
                        </tr>
                      </table>
                    </TabContent>
                    <TabContent for="tab3">
                      <table>
                        <tr>
                          <td>천안 🚌</td>
                          <td>갤러리현 → 제이갤러리 → 아라리오갤러리 천안</td>
                        </tr>
                        <tr>
                          <td>대전</td>
                          <td>이응노미술관 → 대전시립미술관</td>
                        </tr>
                        <tr>
                          <td>강릉</td>
                          <td>뮤직홀리데이 → 강릉시립미술관</td>
                        </tr>
                      </table>
                    </TabContent>
                    <TabContent for="tab4">
                      <table>
                        <tr>
                          <td>주간</td>
                          <td>
                            한희원미술관 → 이강하미술관 → 호랑가시나무창작소 →
                            이이남스튜디오
                          </td>
                        </tr>
                        <tr>
                          <td>야간</td>
                          <td>
                            국립아시아문화전당 → 폴리 Ⅲ &lt;자율건축&gt; →
                            미디어 아트쇼 &#40;518민주광장&#41;
                          </td>
                        </tr>
                        <tr>
                          <td>대구</td>
                          <td>우손갤러리 → 갤러리CNK → 보이드갤러리</td>
                        </tr>
                      </table>
                    </TabContent>
                    <TabContent for="tab5">
                      <table>
                        <tr>
                          <td>부산</td>
                          <td>부산시립미술관 → 고은사진미술관</td>
                        </tr>
                        <tr>
                          <td>김해</td>
                          <td>클레이아크 김해미술관 → 도자체험프로그램</td>
                        </tr>
                        <tr>
                          <td>제주</td>
                          <td>
                            산지천갤러리 → 아라리오뮤지엄 동문모텔 2 →
                            아라리오뮤지엄 동문모텔 1
                          </td>
                        </tr>
                      </table>
                    </TabContent>
                  </div>
                </Tabs>
              </div>
            </div>
          )}
        </div>

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
                  dateTime={blog.datetime.toString().split('T')[0]}
                  button={blog.button}
                />
              ))}

            <Pagination
              activePage={page}
              itemsCountPerPage={list}
              totalItemsCount={blogs.length - 1}
              pageRangeDisplayed={5}
              prevPageText={'<'}
              nextPageText={'>'}
              firstPageText={'<<'}
              lastPageText={'>>'}
              onChange={handlePageChange}
            />
          </ul>
        )}
      </div>
    </div>
  );
};

export default Main;
