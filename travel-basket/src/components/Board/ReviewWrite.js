import React, { useRef, useState } from 'react';
import axios from 'axios';
import WriteEditor from './editor/WriteEditor';
import { useNavigate } from 'react-router-dom';
import '../Board/board_css/ReviewWrite.scss';

const ReviewWrite = () => {
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');

  const titleRef = useRef();
  const navigate = useNavigate();

  const handleWrite = (e) => {
    e.preventDefault();

    if (titleRef.current.value === '' || titleRef.current.value === undefined) {
      alert('제목을 입력해주세요:)');
      titleRef.current.focus();
      return false;
    }

    if (desc === '' || desc === undefined) {
      alert('내용을 입력해주세요:)');
      return false;
    }

    axios
      .post('http://localhost:8000/review/write', {
        title: titleRef.current.value,
        content: desc,
        user: window.sessionStorage.getItem('USER_IDX'),
      })
      .then((res) => {
        alert('새 글이 등록되었습니다.');
        navigate('/review');
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      <div className="Write">
        <div className="Title">
          <h1>후기 작성</h1>
        </div>
        <div className="WTitle">
          <p className="RW_title"></p>
          <input
            className="title_input"
            type="text"
            name="title"
            ref={titleRef}
            placeholder="제목을 입력해주세요"
          />
        </div>
        <div className="Wysiwyg">
          <WriteEditor desc={desc} setDesc={setDesc} setImage={setImage} />
        </div>
        <div className="btnWrap">
          <button className="submit" type="submit" onClick={handleWrite}>
            등록
          </button>
          <button className="cancel" type="reset" onClick={() => navigate(-1)}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewWrite;
