import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ModifyEditor from './editor/ModifyEditor';
import { useNavigate } from 'react-router-dom';
import '../Board/board_css/ReviewModify.scss';

const ReviewModify = () => {
  const navigate = useNavigate();

  // 수정페이지에 param으로 게시물 번호에 맞는 게시물 내용 가져오기
  const params = useParams();
  console.log('수정 페이지 params :', params);

  const [modify, setModify] = useState({
    review_idx: 0,
    review_title: '',
    review_txt: '',
    review_date: '',
    user_idx: '',
    user_nick: '',
    review_like: '',
    review_cnt: '',
  });

  const [desc, setDesc] = useState('');
  const [images, setImage] = useState('');

  const newArticle = modify.review_txt;
  const [content, setContent] = useState('');

  console.log('Modify에 newArticle =>', newArticle);
  console.log('Modify에 content =>', content);

  useEffect(() => {
    handleModify();
  }, []);

  // ==============================================
  // 게시물 수정
  // ==============================================
  // 수정 데이터 가져오기
  const handleModify = (e) => {
    axios
      .post('http://localhost:8000/review/view', { params })
      .then((res) => {
        // console.log('handleModify res =>', res);
        const { data } = res;
        if (res.data.length > 0) {
          setModify({
            ...modify,
            review_idx: data[0].REVIEW_IDX,
            review_title: data[0].REVIEW_TITLE,
            review_txt: data[0].REVIEW_TXT,
            review_date: data[0].REVIEW_DATE,
            user_idx: data[0].USER_IDX,
            user_nick: data[0].USER_NICK,
            review_like: data[0].REVIEW_LIKE,
            review_cnt: data[0].REVIEW_CNT,
            // review_file: data[0].REVIEW_FILE
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 수정된 제목 저장
  const onChangeTitle = (e) => {
    setModify({
      ...modify,
      review_title: e.target.value,
    });
  };

  // 수정된 내용 저장
  const txtChange = () => {
    setContent({
      ...content,
      newContent: content,
    });
  };

  // 수정 데이터 전송
  const handleUpdate = () => {
    axios
      .post('http://localhost:8000/review/modify', {
        modify: modify,
        content: content,
      })
      .then((res) => {
        console.log('응답데이터 :', res.data);
        if (res.data === '업데이트성공') {
          alert('수정이 완료되었습니다.');
          navigate('/review');
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      <div className="Modify">
        <div className="Title">
          <h2>후기 게시판 수정</h2>
        </div>
        <div className="WTitle">
          <p className="RW_title"></p>
          <input
            className="title_input"
            type="text"
            name="review_title"
            defaultValue={modify.review_title}
            onChange={onChangeTitle}
          />
        </div>
        <div className="Wysiwyg">
          <ModifyEditor
            content={newArticle}
            setContent={setContent}
            desc={desc}
            setDesc={setDesc}
            setImage={setImage}
            onChange={txtChange}
          />
        </div>
        <div className="btnWrap_edit">
          <button type="submit" onClick={handleUpdate}>
            등록
          </button>
          <button type="reset" onClick={() => navigate(-1)}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModify;
