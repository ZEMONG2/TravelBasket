import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import * as List from './ReviewList';
import ReviewComment from './ReviewComment';
import '../Board/board_css/ReviewView.scss';
import { IoIosArrowDropleft } from 'react-icons/io';

const ReviewView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const sessionIdx = window.sessionStorage.getItem('USER_IDX');

  var ckCnt = 0;
  var ckIdx = 0;
  var likeOX = '';
  // console.log('params :', params);

  const [view, setView] = useState({
    review_idx: 0,
    review_title: '',
    review_txt: '',
    review_date: '',
    user_idx: '',
    user_nick: '',
    review_like: '',
    review_cnt: '',
    like_ox: '',
    comment_cnt: '',
  });

  console.log('뷰어 view => ', view);

  useEffect(() => {
    handleView();
  }, []);

  // 뒤로 이동
  const back = () => {
    navigate('/review');
  };

  // 수정 페이지 링크
  // const modifyLink = `/review/modify/${view.review_idx}`;
  const insert = () => {
    navigate(`/review/modify/${view.review_idx}`);
  };

  // ==============================================
  // 게시물 상세페이지
  // ==============================================
  const handleView = () => {
    axios
      .post('http://localhost:8000/review/view', { params, sessionIdx })
      .then((res) => {
        console.log('handleView res =>', res);
        // console.log('target =>', e.target.id);

        const { data } = res;
        ckIdx = data[0].REVIEW_IDX;
        ckCnt = data[0].REVIEW_CNT;
        if (res.data.length > 0) {
          setView({
            ...view,
            review_idx: data[0].REVIEW_IDX,
            review_title: data[0].REVIEW_TITLE,
            review_txt: data[0].REVIEW_TXT,
            review_date: data[0].REVIEW_DATE,
            user_idx: data[0].USER_IDX,
            user_nick: data[0].USER_NICK,
            review_like: data[0].REVIEW_LIKE,
            review_cnt: data[0].REVIEW_CNT,
            like_ox: '',
            comment_cnt: data[0].COMMENT_CNT,
            // review_file: data[0].REVIEW_FILE
          });
        }

        axios
          .post('http://localhost:8000/view/like', { params, sessionIdx })
          .then((res) => {
            if (res.data.length > 0) {
              setView({
                ...view,
                review_idx: data[0].REVIEW_IDX,
                review_title: data[0].REVIEW_TITLE,
                review_txt: data[0].REVIEW_TXT,
                review_date: data[0].REVIEW_DATE,
                user_idx: data[0].USER_IDX,
                user_nick: data[0].USER_NICK,
                review_like: data[0].REVIEW_LIKE,
                review_cnt: data[0].REVIEW_CNT,
                like_ox: res.data[0].LIKE_OX,
                comment_cnt: data[0].COMMENT_CNT,
              });
            }
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .then((res) => {
        const viewCnt = ckCnt + 1;
        const viewIdx = ckIdx;
        axios
          .post('http://localhost:8000/view/cnt', {
            viewCnt,
            viewIdx,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 게시글 시간 변경 (뷰어)
  const viewTime = List.reviewTime(view.review_date)
    .toString()
    .replace('T', ' ')
    .replace(/\..*/, '');

  // ==============================================
  // 좋아요 기능
  // ==============================================
  const reviewLike = () => {
    if (view.like_ox == '') {
      view.review_like = view.review_like + 1;
      axios
        .post('http://localhost:8000/view/like/insert', {
          params,
          sessionIdx,
          likeOX: 'O',
        })
        .then((res) => {
          setView({
            ...view,
            like_ox: 'O',
          });
          axios
            .post('http://localhost:8000/view/like/cnt', { params })
            .then()
            .catch((e) => {
              console.error(e);
            });
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      if (view.like_ox == 'O') {
        likeOX = 'X';
        // console.log('좋아요 누를때 바꿔줄거야', view.review_like);
        view.review_like = view.review_like - 1;
      } else {
        likeOX = 'O';
        // console.log('좋아요 누를때 바꿔줄거야', view.review_like);
        view.review_like = view.review_like + 1;
      }

      axios
        .post('http://localhost:8000/view/like/update', {
          params,
          sessionIdx,
          likeOX,
        })
        .then((res) => {
          setView({
            ...view,
            like_ox: likeOX,
          });
          axios
            .post('http://localhost:8000/view/like/cnt', { params })
            .then()
            .catch((e) => {
              console.error(e);
            });
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  // ==============================================
  // 게시물 삭제
  // ==============================================
  const handleDelete = (e) => {
    // console.log('삭제 버튼 만들거야 ', view.review_idx);
    if (window.confirm('정말 삭제하시겠습니까?')) {
      axios
        .post('http://localhost:8000/review/delete', { params })
        .then((res) => {
          navigate('/review');
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  return (
    <div>
      <p>
        <IoIosArrowDropleft onClick={back} className="back" />
      </p>
      <div className="ViewBox">
        <div className="ViewTitle">
          <h2>{view.review_title}</h2>
          <ul className="bad_ul">
            <li className="li_u">😀 {view.user_nick}</li>
            <br />
            <li className="li">✏️{viewTime}&nbsp;&nbsp;&nbsp; </li>
            <li className="li">
              <span className="likeIcon" onClick={reviewLike}>
                {view.like_ox === 'O' ? '❤️' : '🤍'}
              </span>
              {view.review_like} &nbsp;&nbsp;&nbsp;{' '}
            </li>
            <li className="li">💬{view.comment_cnt} &nbsp;&nbsp;&nbsp; </li>
            <li className="li">👁️‍🗨️{view.review_cnt} &nbsp;&nbsp;&nbsp; </li>
            <hr />
          </ul>
        </div>
        <div
          className="ViewTxt"
          dangerouslySetInnerHTML={{ __html: view.review_txt }}
        ></div>
      </div>

      {/* 게시물 작성자만 수정, 삭제 보이도록 */}
      {sessionIdx == view.user_idx ? (
        <div className="btn-wrap">
          <button className="btn-go" onClick={insert} id={view.review_idx}>
            수정
          </button>
          <button className="btn-go" onClick={handleDelete}>
            삭제
          </button>
        </div>
      ) : null}

      {/* 댓글 컴포넌트 */}
      <div className="comment">
        <ReviewComment view={view} setView={setView} />
      </div>
    </div>
  );
};

export default ReviewView;
