import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ModifyEditor from '../editor/ModifyEditor';
import { useNavigate } from '../../node_modules/react-router-dom/index';

const ReviewModify = () => {
    // console.log('수정페이지 view => ', view);
    const navigate = useNavigate();

    // 수정페이지에 param으로 게시물 번호에 맞는 게시물 내용 가져오기
    const params = useParams();
    console.log("수정 페이지 params :", params);

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

    useEffect(()=>{
        handleModify();
    },[])

    const handleModify = (e) => {
        axios
            .post("http://localhost:8008/review/view", {params})
            .then((res) => {
                // console.log('handleModify res =>', res);
                const {data} = res;
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
            .catch((e) => {console.error(e);});
    };
    

    // 게시물 수정 
    console.log('Modify에 저장확인 =>', modify);
    const [desc, setDesc] = useState('');
    const [images, setImage] = useState('');

    const newArticle = modify.review_txt;
    const [content, setContent] = useState('');

    console.log('Modify에 newArticle =>', newArticle);
    console.log('Modify에 content =>', content);


    const onChangeTitle = (e) => {
        // console.log('제목변경', modify);
        setModify({
            ...modify,
            review_title: e.target.value,
        });
    };

    const txtChange = () => {
        setContent({
            ...content,
            newContent: content,
        });
    };

    const handleUpdate = () => {
        // console.log('handleUpdate => ', content);

        axios
            .post("http://localhost:8008/review/modify", {
                modify: modify,
                content: content,
            })
            .then((res) => {
                console.log('응답데이터 :', res.data);
                if(res.data === "업데이트성공") {
                    console.log('뜬다');
                    alert('수정이 완료되었습니다.');
                    navigate('/review');
                }
            })
            .catch((e) => {console.error(e);});
    }



    return(
        <div>
            <div className="Modify">
                <div className="Title"><h2>후기 게시판 수정</h2></div>
                <div className="WTitle">
                    <input type="text" name="review_title" defaultValue={modify.review_title} onChange={onChangeTitle} />
                </div>
                <div className="Wysiwyg">
                    <ModifyEditor content={newArticle} setContent={setContent} desc={desc} setDesc={setDesc} setImage={setImage} onChange={txtChange} />
                </div>
                <div className="btnWrap">
                    <button type="submit" onClick={handleUpdate}>등록</button>
                    <button type="reset" onClick={() => navigate(-1)}>취소</button>
                </div>
            </div>
        </div>
    );
};

export default ReviewModify;