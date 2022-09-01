import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../img/NEXTRAVEL_v.png';
import * as List from './ReviewList';
import '../Board/board_css/ReviewArticle.scss';

const ReviewArticle = ({ article }) => {
  const navigate = useNavigate();
  const txt = article.REVIEW_TXT;
  const url = txt.substring(txt.indexOf('http'), txt.indexOf('g">') + 1);

  // 리스트 썸네일 이미지 배경으로 변경
  const thumbImg = {
    backgroundRepeat: 'no-repeat', // 배경 이미지 반복X
    backgroundImage: `url(${url})`,
    width: '100%',
    height: '180px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  // // // 상세 페이지 이동
  // const viewLink = `/review/view/${article.REVIEW_IDX}`;

  // 게시글 이동
  const view = () => {
    navigate(`/review/view/${article.REVIEW_IDX}`);
  };

  // 게시글 시간 변경 (리스트 화면)
  const listTime = List.reviewTime(article.REVIEW_DATE)
    .toString()
    .split('T')[0];
  // console.log(listTime);

  return (
    <div>
      <div onClick={view} className="ListBox">
        <p id={article.REVIEW_IDX}></p>
        {url === '' ? (
          <div className="noImg">
            <img src={logo} alt="NEXT TRAVEL" />
          </div>
        ) : (
          <div className="ReviewThumb" style={thumbImg}></div>
        )}
        <div className="ReviewTxt">
          <p>{article.REVIEW_TITLE}</p>
          {/* <p>{article.REVIEW_TXT}</p> */}
          {/* <p dangerouslySetInnerHTML={{ __html: article.REVIEW_TXT }}></p> */}
          <ul className="ul">
            <li className="li">😀 {article.USER_NICK} </li>
            <br />
            <li className="li">❤️{article.REVIEW_LIKE} &nbsp; </li>
            <li className="li">💬{article.COMMENT_CNT} &nbsp; </li>
            <li className="li">👁️‍🗨️{article.REVIEW_CNT} &nbsp; </li>
            <li className="li">✏️{listTime} </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReviewArticle;
