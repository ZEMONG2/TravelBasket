import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import * as List from './ReviewList';

const ReviewCommentArticle = ({ comment, setComment, view, setView }) => {
  const sessionIdx = window.sessionStorage.getItem('USER_IDX');
  const params = useParams();

  // 댓글 삭제
  const commentDelete = (e) => {
    console.log('삭제할 댓글의 인덱스 가져오기', e.target.id);

    if (window.confirm('정말 삭제하시겠습니까?')) {
      axios
        .post('http://localhost:8000/review/comment/delete', {
          params,
          comment_idx: e.target.id,
          user: sessionIdx,
        })
        .then(() => {
          axios
            .post('http://localhost:8000/review/comment/cnt', { params })
            .then((res) => {
              // window.location.reload();
              setView({
                ...view,
                comment_cnt: view.comment_cnt - 1,
              });
            })
            .catch((e) => {
              console.error(e);
            });
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  // 댓글 수정
  const [modify, setModify] = useState(false);
  const commentModifyRef = useRef();

  const commentUpdate = (e) => {
    console.log(
      '수정하려면 해당 댓글 인덱스가 필요해,',
      e.target.className,
      commentModifyRef.current.value,
    );
    var commentIdx = e.target.className;
    var comment = commentModifyRef.current.value;

    axios
      .post('http://localhost:8000/review/comment/update', {
        commentIdx,
        comment,
      })
      .then((res) => {
        setModify(!modify);

        axios
          .post('http://localhost:8000/review/comment', { params })
          .then((res) => {
            setComment({
              commentList: res.data,
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

  return (
    <div className="comment_list">
      <div
        className={
          sessionIdx == comment.USER_IDX
            ? 'CommentBox myCommentBox'
            : 'CommentBox'
        }
      >
        <ul className={comment.COMMENT_IDX}>
          <li className="comment-nick">
            {comment.USER_NICK}
            {comment.USER_IDX === view.user_idx ? (
              <span className="ft_writer">작성자</span>
            ) : null}
          </li>
          <li>
            {modify ? (
              <textarea className="comment_area_edit" ref={commentModifyRef}>
                {comment.COMMENT_TXT}
              </textarea>
            ) : (
              comment.COMMENT_TXT
            )}
          </li>
          <li className="comment-date">
            {List.reviewTime(comment.COMMENT_DATE).toString().split('T')[0]}
          </li>
        </ul>

        {sessionIdx == comment.USER_IDX ? (
          <div className="C-btn-wrap">
            {modify ? (
              <div className="modifyOn">
                <button onClick={commentUpdate} className={comment.COMMENT_IDX}>
                  등록
                </button>
                <button onClick={() => setModify(!modify)}>취소</button>
              </div>
            ) : (
              <div className="modifyOff">
                <button
                  onClick={() => setModify(!modify)}
                  className={comment.COMMENT_IDX}
                >
                  수정
                </button>
                <button onClick={commentDelete} id={comment.COMMENT_IDX}>
                  삭제
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ReviewCommentArticle;
