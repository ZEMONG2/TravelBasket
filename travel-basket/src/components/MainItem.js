import React from 'react';
import '../css/main_css/MainItem.scss';
import MainItemDialog from './MainItemDialog';
import { useState, useRef } from 'react';
import axios from 'axios';

const itemCategorylist_data = [
  { id: null, value: '카테고리 선택' },
  { id: 'Hotel', value: '숙소' },
  { id: 'Cafe', value: '카페' },
  { id: 'Dining', value: '식당' },
  { id: 'Activity', value: '관광지' },
];

const MainItem = (props) => {
  const write_post = () => {
    window.open(props.url, '_blank');
  };

  const [itemsave, setItemSave] = useState(false); // 다이얼로그 ustState
  // const onClickDiglog_btn = () => {
  //   setItemSave(true);
  // };

  const [Categorylist, setCategoryList] = useState(''); // 카테고리를 출력할 useState
  const handleCategorylist = (e) => {
    //onchange 이벤트 발생한 target을 받아와 value값 할당
    const { value } = e.target;
    setCategoryList(
      itemCategorylist_data.filter((el) => el.value === value)[0].id,
    ); // id에 넣을 데이터
  };

  //   // 장바구니 데이터 전송

  //   const [items, setItems] = useState('');
  //   const basketRef = useRef();

  //   const handlebasket = (e) => {
  //     e.preventDefault();

  //   axios
  //   .post('http://localhost:8000/basket', {
  //     title: basketRef.current.value,
  //     content: items,
  //     user: window.sessionStorage.getItem('USER_IDX'),
  //   })
  //   .then((res) => {
  //     alert('장바구니에 추가되었습니다.');
  //     // titleRef.current.value = "";
  //     // content = "";
  //   })
  //   .catch((e) => {
  //     console.error(e);
  //   });
  // };

  return (
    <div>
      <li className="blogWrite">
        <h3
          className="blog_title"
          dangerouslySetInnerHTML={{ __html: props.title }}
          onClick={write_post}
        ></h3>
        <img
          className="write_img"
          src={props.thumbnail}
          alt={props.thumbnail}
        />
        <article dangerouslySetInnerHTML={{ __html: props.contents }}></article>
        <br />
        <span dangerouslySetInnerHTML={{ __html: props.blogName }}></span>
        <span>✍🏻{props.dateTime}</span>
        <button
          type="button"
          value="장바구니"
          className="cart_btn"
          onClick={() => setItemSave(!itemsave)}
        >
          장바구니
        </button>
        {itemsave && (
          <MainItemDialog closeModal={() => setItemSave(!itemsave)}>
            <div className="itemsavelist">
              <div>
                <h2>여행 일정 추가</h2>
              </div>

              <div className="itemcategory">
                <b>카테고리 선택 </b>
                <select onChange={handleCategorylist}>
                  {itemCategorylist_data.map((el) => {
                    return <option key={el.id}>{el.value}</option>;
                  })}
                </select>
                <test>
                  <p>id.code : {Categorylist}</p>
                </test>
              </div>

              <div className="itemsavename">
                <b>이름 입력 </b>
                <input
                  type="text"
                  placeholder="저장할 이름을 적어주세요"
                  name="itemsavename"
                  className="itemsavename"
                />
              </div>

              <div className="itemsavememo">
                <b>메모 입력 </b>
                <input
                  type="text"
                  placeholder="저장할 메모를 적어주세요"
                  name="itemsavememo"
                  className="itemsavememo"
                />
              </div>

              <button
                type="button"
                value="내 여행 일정에 넣기"
                className="itemsave_btn"
                onclick={onclick}
              >
                <b>장바구니 담기</b>
              </button>
            </div>
          </MainItemDialog>
        )}
      </li>
      <hr />
    </div>
  );
};

export default MainItem;
