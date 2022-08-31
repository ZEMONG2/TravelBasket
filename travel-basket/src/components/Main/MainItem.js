import React from 'react';
import '../Main/main_css/BasketModal_All.scss';
import MainItemDialog from './MainItemDialog';
import { useState, useRef } from 'react';
import axios from 'axios';

// const itemCategorylist_data = [
//   { name: null, value: '카테고리를 선택하세요' },
//   { name: 'Hotel', value: '숙소' },
//   { name: 'Cafe', value: '카페' },
//   { name: 'Dining', value: '식당' },
//   { name: 'Activity', value: '관광지' },
// ];

// const [Categorylist, setCategoryList] = useState(''); // 카테고리를 출력할 useState
// const handleCategorylist = (e) => {
//   //onchange 이벤트 발생한 target을 받아와 value값 할당
//   const { value } = e.target;
//   setCategoryList(
//     itemCategorylist_data.filter((el) => el.value === value)[0].id,
//   ); // id에 넣을 데이터
// };

// {itemCategorylist_data.map((el) => {
//   return (
//     <option key={el.id} name="catagory" ref={categolyRef}>
//       {el.value}
//     </option>
//   );
// })}

const MainItem = (props) => {
  const write_post = () => {
    window.open(props.url, '_blank');
  };

  const [itemsave, setItemSave] = React.useState(false); // 다이얼로그 ustState
  const [searchUrl, setSearchUrl] = useState('');
  //장바구니 데이터 전송 요청 코드

  const categoryRef = useRef();
  const irumRef = useRef();
  const memoRef = useRef();

  // 엔터키 입력시 장바구니 저장 자동 버튼 클릭
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlebasket();
    }
  };

  //모달창 열기
  const cartSendData = (e) => {
    setItemSave(!itemsave);
    console.log(e.target.value);
    setSearchUrl(e.target.value);
  };

  // const [disable, setDisable] = React.useState(false);

  //버튼 클릭시 실행
  const handlebasket = () => {
    console.log('category===>', categoryRef.current.value);
    console.log('name===>', irumRef.current.value);
    console.log('memo===>', memoRef.current.value);

    //카테고리 입력 확인
    if (
      categoryRef.current.value === '' ||
      categoryRef.current.value === undefined
    ) {
      alert('카테고리를 선택하세요!');
      categoryRef.current.focus();
      return false;
    }
    // 이름 입력 확인
    if (irumRef.current.value === '' || irumRef.current.value === undefined) {
      alert('이름을 입력하세요!');
      irumRef.current.focus();
      return false;
    }
    // 메모 입력 확인
    if (memoRef.current.value === '' || memoRef.current.value === undefined) {
      alert('메모를 입력하세요!');
      memoRef.current.focus();
      return false;
    }

    // 장바구니 데이터 보내기 실행 버튼
    axios
      .post('http://localhost:8000/basket/insert', {
        link: searchUrl,
        category: categoryRef.current.value,
        irum: irumRef.current.value,
        memo: memoRef.current.value,
        user: window.sessionStorage.getItem('USER_IDX'),
      })
      .then((res) => {
        console.log(res);
        alert('장바구니에 추가되었습니다!');
        setItemSave(!itemsave);
      })
      .catch((e) => {
        console.error(e);
      });
  };

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
          className="cart_btn"
          value={props.url}
          disabled={itemsave}
          onClick={() =>
            window.sessionStorage.length === 0
              ? alert('로그인후 이용해주세요') &
                window.location.replace('/login')
              : cartSendData()
          }
        >
          장바구니
        </button>
      </li>

      <div className="Model">
        {itemsave && (
          <MainItemDialog closeModal={() => setItemSave(!itemsave)}>
            <div className="Basket_modal">
              <div>
                <h3 className="h3_basket">장바구니</h3>
              </div>

              <div>
                <select className="basket_Category" ref={categoryRef}>
                  <option name="category" value="">
                    카테고리를 선택하세요
                  </option>
                  <option value="Hotel" name="category">
                    숙소
                  </option>
                  <option value="Cafe" name="category">
                    카페
                  </option>
                  <option value="Dining" name="category">
                    식당
                  </option>
                  <option value="Activity" name="category">
                    관광지
                  </option>
                </select>

                <input
                  type="text"
                  placeholder="저장할 이름을 적어주세요"
                  name="irum"
                  className="basketTitle"
                  defaultValue=""
                  ref={irumRef}
                />

                <input
                  type="text"
                  placeholder="저장할 메모를 적어주세요"
                  name="memo"
                  className="basketMemo"
                  defaultValue=""
                  ref={memoRef}
                  onKeyPress={onKeyPress}
                />

                <button
                  type="submit"
                  value="내 여행 일정에 넣기"
                  className="basketSave_btn"
                  onClick={handlebasket}
                >
                  담기
                </button>
              </div>
            </div>
          </MainItemDialog>
        )}
      </div>
      <hr />
    </div>
  );
};

export default MainItem;
