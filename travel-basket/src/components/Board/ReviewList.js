import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReviewArticle from './ReviewArticle';
import Pagination from 'react-js-pagination';
import '../Board/board_css/ReviewList.scss';

const ReviewList = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getList();
    // valueSort();
  }, []);

  // 페이징 게시물 사용 변수
  const [reviewlist, setReviewlist] = useState({
    reviewList: [],
  });

  const [articleCnt, setArticleCnt] = useState(6);
  const [page, setPage] = useState(1);

  const optionRef = useRef();
  const searchRef = useRef();

  const handlePage = (pageCking) => {
    setPage(pageCking);
  };

  // 글쓰기 이동
  const write = () => {
    navigate('/review/write');
  };

  // 게시물 불러오기
  const getList = () => {
    axios
      .get('http://localhost:8000/review', {})
      .then((res) => {
        const { data } = res;
        setReviewlist({
          reviewList: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 검색
  const getSearchList = (e) => {
    if (searchRef.current.value == '') {
      alert('검색어를 입력해주세요.');
    } else {
      axios
        .post('http://localhost:8000/review/search', {
          searchData: searchRef.current.value,
          optionData: optionRef.current.value,
        })
        .then((res) => {
          const { data } = res;
          setReviewlist({
            reviewList: data,
          });
          setPage(1);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  // 검색 여부 판단
  const checkData = (e) => {
    const order = e.target.id;
    if (searchRef.current.value == '') {
      getListOrderBy(order);
    } else {
      getSearchListOrderBy(order);
    }
  };

  // 검색어 無 정렬
  const getListOrderBy = (order) => {
    axios
      .post('http://localhost:8000/review/orderBy/all', {
        order: order,
      })
      .then((res) => {
        const { data } = res;
        setReviewlist({
          reviewList: data,
        });
        setPage(1);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 검색어 有 정렬
  const getSearchListOrderBy = (order) => {
    axios
      .post('http://localhost:8000/review/orderBy/search', {
        order: order,
        sortSearchData: searchRef.current.value,
        optionData: optionRef.current.value,
      })
      .then((res) => {
        const { data } = res;
        setReviewlist({
          reviewList: data,
        });
        setPage(1);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 검색 ENTER
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      getSearchList();
    }
  };

  // 등록된 게시물이 없을때
  if (reviewlist.reviewList.length === 0) {
    // window.sessionStorage.setItem("USER_IDX", 18);
    return (
      <div className="ReviewList">
        <h1>후기 게시판</h1>
        <button className="btn-write-no" onClick={write}>
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
            className="reviewSearch"
            type="text"
            name="reviewSearch"
            ref={searchRef}
            placeholder="후기 검색"
            onKeyPress={onKeyPress}
          />
          <button className="reviewSearch_btn" onClick={getSearchList}>
            검색
          </button>
        </div>

        {/* 게시물 정렬 */}
        <div>
          <ul className="sortList">
            <li onClick={checkData} id="REVIEW_IDX">
              &nbsp;최신순
            </li>
            <li onClick={checkData} id="REVIEW_CNT">
              &nbsp;| 조회수
            </li>
            <li onClick={checkData} id="REVIEW_LIKE">
              &nbsp;| 좋아요수
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
          {reviewlist.reviewList
            .slice(
              articleCnt * (page - 1),
              articleCnt * (page - 1) + articleCnt,
            )
            .map((article) => {
              return <ReviewArticle article={article} />;
            })}
        </div>

        {/* 글쓰기 버튼 */}
        <div className="btn-write-wrap">
          <button className="btn-write" onClick={write}>
            글쓰기
          </button>
        </div>
        {/* 페이징 */}
        <div className="Paging">
          <Pagination
            activePage={page}
            itemCountPerPage={articleCnt}
            totalItemsCount={reviewlist.reviewList.length}
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
