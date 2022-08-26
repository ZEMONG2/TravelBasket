import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReviewArticle from './ReviewArticle';
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

  const [reviewlist, setReviewlist] = useState({
    reviewList: [],
  });

  useEffect(() => {
    getList();
  }, []);

  const navigate = useNavigate();

  // 글쓰기 이동
  const write = () => {
    navigate('/review/write');
  };

  const getList = () => {
    axios
      .get('http://localhost:8000/review', {})
      .then((res) => {
        // console.log('리뷰 getList res => ', res);

        const { data } = res;
        setReviewlist({
          reviewList: data,
        });
        // navigate('/review/view');
      })
      .catch((e) => {
        console.error(e);
      });
  };

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
        <button className="btn-write" onClick={write}>
          글쓰기
        </button>
        <div>
          {reviewlist.reviewList.map((article) => {
            return <ReviewArticle article={article} />;
          })}
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