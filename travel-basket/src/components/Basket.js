import {
  MdLocalGroceryStore,
  MdLocalHotel,
  MdLocalCafe,
  MdLocalDining,
  MdLocalActivity,
} from 'react-icons/md';
import '../css/main_css/Basket.scss';
import React, { useState, useEffect, useCallback } from 'react';

import axios from 'axios';

const categories = [
  {
    name: 'All',
    value: 'All',
    text: '전체보기',
  },
  {
    name: 'Hotel',
    value: 'Hotel',
    text: '숙소',
  },
  {
    name: 'Cafe',
    value: 'Cafe',
    text: '카페',
  },
  {
    name: 'Dining',
    value: 'Dining',
    text: '식당',
  },
  {
    name: 'Activity',
    value: 'Activity',
    text: '관광지',
  },
];

const Basket = () => {
  const [searchData, setSearchData] = useState([]); //데이터

  const user_idx = window.sessionStorage.getItem('USER_IDX');

  useEffect(() => {
    basketdata();
  }, []);

  // DB
  const basketdata = () => {
    axios
      .post('http://localhost:8000/basket/select', { user_idx })
      .then((res) => {
        console.log('res =>', res);

        const { data } = res;
        if (res.data.length > 0) {
          setSearchData(data);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const searchlinkgo = (e) => {
    const linkCK = e.target.value;
    console.log('=================', linkCK);
    window.open(searchData.SEARCH_LINK, '_blank');
  };

  console.log('데이터 확인  :', searchData);

  // const __selectCategory = (e) => {
  //   const categoryValue = e.target;
  //   console.log('확인 ', categoryValue);
  // };

  // 등록된 장바구니가 없을때
  if (searchData === 0) {
    return (
      <div>
        <button>
          <MdLocalHotel />
        </button>
        <button>
          <MdLocalCafe />
        </button>
        <button>
          <MdLocalDining />
        </button>
        <button>
          <MdLocalActivity />
        </button>
        <h1>나의 장바구니</h1>
        <MdLocalGroceryStore className="basket" />
        <h3 className="bin_basket">장바구니에 담긴 장소가 없습니다.</h3>
      </div>
    );
  } else {
    // 등록된 장바구니가 있을때
    return (
      <div className="basketitemlist">
        <h1>나의 장바구니</h1>
        <p>아직 카테고리 분류 미구현</p>
        {categories.map((idx) => (
          <div key={idx.value}>{idx.text}</div>
        ))}
        <br />
        <br />
        <div className="category_btn">
          <button>
            <MdLocalHotel />
          </button>
          <button>
            <MdLocalCafe />
          </button>
          <button>
            <MdLocalDining />
          </button>
          <button>
            <MdLocalActivity />
          </button>
        </div>
        <br />
        <br />
        <div className="HotelCate">
          -----------------------------------------------------
          {searchData
            .filter((SEARCH_IDX) => SEARCH_IDX.SEARCH_CATEGORY === 'Hotel')
            .map((SEARCH_IDX) => (
              <div key={SEARCH_IDX.id}>
                <li
                  onClick={() => {
                    window.open(SEARCH_IDX.SEARCH_LINK, '_blank');
                  }}
                >
                  <li>{SEARCH_IDX.SEARCH_CATEGORY}</li>
                  <li>{SEARCH_IDX.SEARCH_TITLE}</li>
                  <li>{SEARCH_IDX.SEARCH_TXT}</li>
                </li>
              </div>
            ))}
        </div>
        ------------------------------------------
        <div>
          {searchData
            .filter((SEARCH_IDX) => SEARCH_IDX.SEARCH_CATEGORY === 'Cafe')
            .map((SEARCH_IDX) => (
              <div key={SEARCH_IDX.id}>
                <li
                  onClick={() => {
                    window.open(SEARCH_IDX.SEARCH_LINK, '_blank');
                  }}
                >
                  <li>{SEARCH_IDX.SEARCH_CATEGORY}</li>
                  <li>{SEARCH_IDX.SEARCH_TITLE}</li>
                  <li>{SEARCH_IDX.SEARCH_TXT}</li>
                </li>
              </div>
            ))}
        </div>
        ----------------------------------------------------------
        <div>
          {searchData
            .filter((SEARCH_IDX) => SEARCH_IDX.SEARCH_CATEGORY === 'Dining')
            .map((SEARCH_IDX) => (
              <div key={SEARCH_IDX.id}>
                <li
                  onClick={() => {
                    window.open(SEARCH_IDX.SEARCH_LINK, '_blank');
                  }}
                >
                  <li>{SEARCH_IDX.SEARCH_CATEGORY}</li>
                  <li>{SEARCH_IDX.SEARCH_TITLE}</li>
                  <li>{SEARCH_IDX.SEARCH_TXT}</li>
                </li>
              </div>
            ))}
        </div>
        ----------------------------------------------------------
        <div>
          {searchData
            .filter((SEARCH_IDX) => SEARCH_IDX.SEARCH_CATEGORY === 'Activity')
            .map((SEARCH_IDX) => (
              <div key={SEARCH_IDX.id}>
                <li
                  onClick={() => {
                    window.open(SEARCH_IDX.SEARCH_LINK, '_blank');
                  }}
                >
                  <li>{SEARCH_IDX.SEARCH_CATEGORY}</li>
                  <li>{SEARCH_IDX.SEARCH_TITLE}</li>
                  <li>{SEARCH_IDX.SEARCH_TXT}</li>
                </li>
              </div>
            ))}
        </div>
      </div>
    );
  }
};

export default Basket;
