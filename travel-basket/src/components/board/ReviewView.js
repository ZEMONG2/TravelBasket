import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as List from './ReviewList';


const ReviewView = () => {
    const navigate = useNavigate();
    const params = useParams();
    console.log("params :", params)

    const [view, setView] = useState({
        review_idx: 0,
        review_title: '',
        review_txt: '',
        review_date: '',
        user_idx: '',
        user_nick: '',
        review_like: '',
        review_cnt: '',
    });

    console.log('뷰어 view => ', view);


    useEffect(()=>{
        handleView();
    },[]);

    const handleView = () => {
        axios
            .post("http://localhost:8008/review/view", {params})
            .then((res) => {
                console.log('handleView res =>', res);
                // console.log('target =>', e.target.id);
                
                const {data} = res;                
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
                        // review_file: data[0].REVIEW_FILE
                    });    
                }

            })
            .catch((e) => {console.error(e);});
    };
    
    // 게시글 시간 변경 (뷰어)
    const viewTime = List.reviewTime(view.review_date).toString().replace("T", " ").replace(/\..*/, '');


    // 수정 페이지 링크
    const modifyLink = `/review/modify/${view.review_idx}`

    // 게시물 삭제
    const handleDelete = (e) => {
        console.log('삭제 버튼 만들거야 ', view.review_idx);
        if (window.confirm("정말 삭제하시겠습니까?")) {
            axios
                .post("http://localhost:8008/delete", {
                    idx: view.review_idx,
                })
                .then((res) => {
                    navigate('/review');
                })
                .catch((e) => {console.error(e);});
        }
    };

    return (
        <div>
            <a href="/review" className="btn-go">목록</a>
            <div className="ViewBox">
                <div className="ViewTitle">
                    <h2>타이틀.{view.review_title}</h2>
                    <ul>
                        <li>닉네임.{view.user_nick}</li>
                        <li>날짜.{viewTime}</li>
                    </ul>
                </div>
                <div className="ViewImg"></div>
                <div className="ViewTxt" dangerouslySetInnerHTML={{ __html: view.review_txt }}>
                </div>
                <ul>
                    <li>{view.review_like}</li>
                    <li>{view.review_idx}</li>
                    <li>{view.review_cnt}</li>
                </ul>
            </div>

            <div className="btn-wrap">
                <a className="btn-go" href={modifyLink} id={view.review_idx}>수정</a>
                <button onClick={handleDelete}>삭제</button>
            </div>
        </div>
    );
};

export default ReviewView;