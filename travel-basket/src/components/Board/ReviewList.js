import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReviewArticle from './ReviewArticle';
import Pagination from 'react-js-pagination';
import '../Board/board_css/ReviewList.scss';

const ReviewList = () => {
  // 세션값 있는 경우만 이동가능
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const USER_ID = window.sessionStorage.getItem("USER_ID");
  //   console.log("window.sessionStorage(USER_ID) =>", USER_ID);
  //   if (USER_ID === null) {
  //     alert("로그인후 사용가능합니다!!");
  //     navigate("/");
  //   }
  // });
  const navigate = useNavigate();

  useEffect(() => {
    getList();
    valueSort();
  }, []);

  // 페이징 게시물 사용 변수
  const [reviewlist, setReviewlist] = useState({
    reviewList: [],
  });

  const [articleCnt, setArticleCnt] = useState(0);
  const [page, setPage] = useState(1);

  var pageCk = 1;
  var page_num = 1;
  const page_size = 10;
  var article_cnt = 0;

  // 검색 게시물 사용 변수
  const [searchlist, setSearchlist] = useState({
    searchList: [],
  });

  const optionRef = useRef();
  const searchRef = useRef();

  // 전체 게시물  사용변수
  const [alllist, setAlllist] = useState({
    allList: [],
  });

  const dateRef = useRef();
  const countRef = useRef();
  const likeRef = useRef();

  //총 게시물 수 출력
  var all_cnt = alllist.allList.length;

  // 검색 게시물 수 출력
  var search_cnt = searchlist.searchList.length;
  console.log('검색개수체크', search_cnt);

  // 글쓰기 이동
  const write = () => {
    navigate('/review/write');
  };

  // ==============================================
  // 게시물 리스트 & 페이징
  // ==============================================
  const handlePage = (pageCking) => {
    setPage(pageCking);
    pageCk = pageCking;
    getList();
    // console.log('handlePage=>', page);
  };

  const getList = () => {
    axios
      .get('http://localhost:8000/review/cnt', {})
      .then((res) => {
        const { data } = res;
        article_cnt = data[0].CNT;
        console.log('총 게시물 개수 =>', (article_cnt = data[0].CNT));
        setArticleCnt(article_cnt);
      })
      .then(() => {
        axios
          .post('http://localhost:8000/review', {
            page: pageCk,
            page_size: page_size,
            article_cnt: article_cnt,
          })
          .then((res) => {
            // console.log('게시물 페이징?', res);
            const { data } = res;
            setReviewlist({
              reviewList: data,
            });
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // ==============================================
  // 게시물 검색 기능
  // ==============================================
  const ReviewSearch = () => {
    console.log(optionRef.current.value);
    var optionValue = optionRef.current.value;
    var searchValue = searchRef.current.value;

    axios
      .post('http://localhost:8000/review/search', {
        optionValue,
        searchValue,
      })
      .then((res) => {
        // console.log('검색어 결과 출력 =>', res);
        if (res.data !== 0) {
          setSearchlist({
            ...searchlist,
            searchList: res.data,
          });
        } else {
          alert('검색 결과가 없습니다.');
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };
  // 검색 ENTER
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      ReviewSearch();
    }
  };

  // ==============================================
  // 게시물 정렬
  // ==============================================
  const valueSort = (e) => {
    axios
      .get('http://localhost:8000/review/all')
      .then((res) => {
        console.log('valueSort => ', res.data);
        setAlllist({
          ...alllist,
          allList: res.data,
        });
      })
      .catch((e) => {
        console.err(e);
      });
  };

  const valueCompare = (e) => {
    var sortAllData = alllist.allList.sort().reverse();
    var sortSearchData = searchlist.searchList.sort().reverse();

    if (dateRef.current.contains(e.target)) {
      setAlllist({
        ...alllist,
        allList: sortAllData.sort(compare('REVIEW_IDX')).reverse(),
      });

      setSearchlist({
        ...searchlist,
        searchList: sortSearchData.sort(compare('REVIEW_IDX')).reverse(),
      });
    } else if (countRef.current.contains(e.target)) {
      console.log('조회수 정렬 =>', alllist.allList);

      setAlllist({
        ...alllist,
        allList: sortAllData.sort(compare('REVIEW_CNT')).reverse(),
      });

      setSearchlist({
        ...searchlist,
        searchList: sortSearchData.sort(compare('REVIEW_CNT')).reverse(),
      });
    } else if (likeRef.current.contains(e.target)) {
      console.log('좋아요 정렬 =>', alllist.allList);

      setAlllist({
        ...alllist,
        allList: sortAllData.sort(compare('REVIEW_LIKE')).reverse(),
      });

      setSearchlist({
        ...searchlist,
        searchList: sortSearchData.sort(compare('REVIEW_LIKE')).reverse(),
      });
    }
  };

  // 정렬 조건을 위한 비교 함수
  function compare(key) {
    return (a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0);
  }

  // 등록된 게시물이 없을때
  if (reviewlist.reviewList.length === 0) {
    // window.sessionStorage.setItem("USER_IDX", 18);
    return (
      <div className="ReviewList">
        <h1>후기 게시판</h1>
        <button className="btn-write" onClick={write}>
          글쓰기
        </button>
        <div className="NoList">
          <p>등록된 게시물이 없습니다.</p>
        </div>
      </div>
    );
  } else {
    // 등록된 게시물이 있을 때
    return (
      <div className="ReviewList">
        <h1>후기 게시판</h1>

        {/* 게시물 검색 */}
        <div className="BoardSearch">
          <select className="BoardOption" ref={optionRef}>
            <option value="REVIEW_TITLE, REVIEW_TXT, USER_NICK">전체</option>
            <option value="REVIEW_TITLE">제목</option>
            <option value="REVIEW_TXT">내용</option>
            <option value="USER_NICK">작성자</option>
          </select>
          <input
            type="text"
            name="reviewSearch"
            ref={searchRef}
            placeholder="후기 검색"
            onKeyPress={onKeyPress}
          />
          <button onClick={ReviewSearch}>search</button>
        </div>

        {/* 글쓰기 버튼 */}
        <button className="btn-write" onClick={write}>
          글쓰기
        </button>

        {/* 게시물 정렬 */}
        <div className="sortList">
          <ul>
            <li onClick={valueCompare} ref={dateRef}>
              최신순
            </li>
            <li onClick={valueCompare} ref={countRef}>
              조회수
            </li>
            <li onClick={valueCompare} ref={likeRef}>
              좋아요수
            </li>
          </ul>
        </div>

        {/* <div>
          {reviewlist.reviewList.map((article) => {
            return <ReviewArticle article={article} />;
          })}
        </div> */}
        {/* 게시물 리스트 */}
        <div className="Review">
          {searchlist.searchList.length === 0
            ? reviewlist.reviewList.map((article) => {
                return <ReviewArticle article={article} />;
              })
            : searchlist.searchList.map((article) => {
                return <ReviewArticle article={article} />;
              })}
        </div>

        {/* 페이징 */}
        <div className="Paging">
          <Pagination
            activePage={page}
            itemCountPerPage={10}
            totalItemsCount={articleCnt}
            firstPageText={'<<'}
            prevPageText={'<'}
            nextPageText={'>'}
            lastPageText={'>>'}
            onChange={handlePage}
          />
        </div>
      </div>
    );
  }
};

export default ReviewList;

// 게시글 날짜 변환
export function reviewTime(date) {
  const start = new Date(date);
  const end = new Date();
  const diff = end - start;

  const times = [
    { time: '분', milliSeconds: 1000 * 60 },
    { time: '시간', milliSeconds: 1000 * 60 * 60 },
    { time: '일', milliSeconds: 1000 * 60 * 60 * 24 },
    { time: '개월', milliSeconds: 1000 * 60 * 60 * 24 * 30 },
    { time: '년', milliSeconds: 1000 * 60 * 60 * 24 * 365 },
  ].reverse(); // 아래 코드를 위해서는 (년 ~ 분) 순서여야함

  if (diff >= 86400000) {
    // console.log('diff를 확인하고싶어', diff);
    // const pastDate = date.toString().replace("T", " ").replace(/\..*/, '');;
    return `${date}`;
  } else {
    // 년 단위부터 알맞는 단위 찾기
    for (const value of times) {
      const betweenTime = Math.floor(diff / value.milliSeconds);
      // 큰 단위는 0보다 작은 소수점 값이 나옴
      if (betweenTime > 0) {
        return `${betweenTime}${value.time} 전`;
      }
    }
  }

  // 모든 단위가 맞지 않을 시
  return '방금 전';
}
