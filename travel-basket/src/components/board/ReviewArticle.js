import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../img/logo-v.png';
import * as List from './ReviewList';

const ReviewArticle = ({article, viewClick}) => {
    const navigate = useNavigate();
    const txt = article.REVIEW_TXT;
    const url = txt.substring(txt.indexOf('http'), txt.indexOf('g">')+1);

    // 리스트 썸네일 이미지 배경으로 변경
    const thumbImg = {
        backgroundImage : `url(${url})`,
        width: "100%",
        height: "240px",
        backgroundSize: "cover",
        backgroundPosition: "center",
    }

    // // 상세 페이지 이동
    const viewLink = `/review/view/${article.REVIEW_IDX}`

    // 게시글 시간 변경 (리스트 화면)
    const listTime = List.reviewTime(article.REVIEW_DATE).toString().split("T")[0];
    // console.log(listTime);

    return (
        <div>
            <div className="ListBox">
                <a href={viewLink} id={article.REVIEW_IDX}></a>
                {url === ""? <div className="noImg"><img src={logo} alt="travel basket" /></div> : <div className="ReviewThumb" style={thumbImg}></div>}
                <div className="ReviewTxt">
                    <h3>{article.REVIEW_TITLE}</h3>
                    {/* <p>{article.REVIEW_TXT}</p> */}
                    {/* <p dangerouslySetInnerHTML={{ __html: article.REVIEW_TXT }}></p> */}
                    <h4>{article.USER_NICK} 닉네임</h4>
                    <ul>
                        <li>{article.REVIEW_LIKE} 좋아요</li>
                        <li>{article.REVIEW_IDX} 댓글 개수 연결</li>
                        <li>{article.REVIEW_CNT} 조회수</li>
                        <li>{listTime}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ReviewArticle;