import {
  MdLocalGroceryStore,
  MdLocalHotel,
  MdLocalCafe,
  MdLocalDining,
  MdLocalActivity,
} from 'react-icons/md';
import '../Basket/basket_css/Basket.scss';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Tabs, TabContent, TabLink } from 'react-tabs-redux';
import BasketDialog from './BasketDialog';
import Pagination from 'react-js-pagination';

const categories = [
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
  const [users, setUsers] = useState([]);
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

  console.log('DB 바구니 데이터 확인  :', searchData);

  //장바구니 삭제

  const BasketDelete = (e) => {
    console.log('삭제 데이터 확인', e.target.id);
    if (window.confirm('정말 삭제하시겠습니까?')) {
      axios
        .post('http://localhost:8000/basket/delete', {
          idx: e.target.id,
        })
        .then((res) => {
          console.log(res);
          window.location.replace('/basket');
          alert('삭제가 완료되었습니다!');
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  //모달창?
  const [basketitem, setBasketItem] = useState(false); //모달창 데이터

  const categoryRef = useRef();

  const basketDataedit = (e) => {
    setBasketItem(!basketitem);
  };

  // 장바구니 다중 페이지 구현
  // 장바구니 리스트가 4개라 리스트별로 데이터 나눠서 조작하기 위해 4개로 분리

  // 호텔페이징
  const [hotelpage, setHotelPage] = useState(1);
  const [hotellist, setHotelList] = useState(3);

  const HotelPageChange = (hotelpage) => {
    setHotelPage(hotelpage);
    console.log(hotelpage);
  };

  const HotelChange = (e) => {
    setHotelList(Number(e.target.value));
  };

  //식당 페이징
  const [diningpage, setDiningPage] = useState(1);
  const [dininglist, setDiningList] = useState(3);

  const DiningPageChange = (diningpage) => {
    setDiningPage(diningpage);
    console.log(diningpage);
  };

  const DiningChange = (e) => {
    setDiningList(Number(e.target.value));
  };

  //카페 페이징
  const [cafepage, setCafePage] = useState(1);
  const [cafelist, setCafeList] = useState(3);

  const CafePageChange = (cafepage) => {
    setCafePage(cafepage);
    console.log(cafepage);
  };

  const CafeChange = (e) => {
    setCafeList(Number(e.target.value));
  };

  //관광지 페이징
  const [activitypage, setActivityPage] = useState(1);
  const [activitylist, setActivityList] = useState(3);

  const ActivityPageChange = (activitypage) => {
    setActivityPage(activitypage);
    console.log(activitypage);
  };

  const ActivityChange = (e) => {
    setActivityList(Number(e.target.value));
  };

  // 데이터 보여주는곳
  // 등록된 장바구니가 없을때
  if (searchData.length === 0) {
    return (
      <div>
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
        {/* {categories.map((idx) => (
        <div key={idx.value}>{idx.text}</div>
        ))}
         */}
        <div className="basket_tab_all">
          <Tabs renderActiveTabContentOnly={true} className="basket_Tabs">
            <ul className="basket_tab_list">
              <li className="basket_tab">
                <TabLink to="basket_tab1" default>
                  <MdLocalHotel className="b_icon" />
                </TabLink>
              </li>
              <li className="basket_tab">
                <TabLink to="basket_tab2">
                  <MdLocalCafe className="b_icon" />
                </TabLink>
              </li>
              <li className="basket_tab">
                <TabLink to="basket_tab3">
                  <MdLocalDining className="b_icon" />
                </TabLink>
              </li>
              <li className="basket_tab">
                <TabLink to="basket_tab4">
                  <MdLocalActivity className="b_icon" />
                </TabLink>
              </li>
            </ul>

            <div className="basket_tab_content">
              <TabContent for="basket_tab1">
                <select className="basketlistCount" onChange={HotelChange}>
                  <option value="3">리스트 3개</option>
                  <option value="5">리스트 5개</option>
                  <option value="10">리스트 10개</option>
                </select>
                {searchData
                  .filter(
                    (SEARCH_IDX) => SEARCH_IDX.SEARCH_CATEGORY === 'Hotel',
                  )
                  .slice(
                    hotellist * (hotelpage - 1),
                    hotellist * (hotelpage - 1) + hotellist,
                  )
                  .map((SEARCH_IDX) => (
                    <div key={SEARCH_IDX.id}>
                      <ul>
                        <li
                          onClick={() => {
                            window.open(SEARCH_IDX.SEARCH_LINK, '_blank');
                          }}
                        >
                          {SEARCH_IDX.SEARCH_TITLE}{' '}
                        </li>
                        <li> 메모 : {SEARCH_IDX.SEARCH_TXT}</li>
                      </ul>
                      <button className="basket_edit" onClick={basketDataedit}>
                        수정
                      </button>
                      <button
                        id={SEARCH_IDX.SEARCH_IDX}
                        className="basket_delete"
                        onClick={BasketDelete}
                      >
                        삭제
                      </button>
                      <hr />
                    </div>
                  ))}
                <Pagination
                  activePage={hotelpage}
                  itemsCountPerPage={hotellist}
                  totalItemsCount={searchData.length - 1}
                  pageRangeDisplayed={5}
                  prevPageText={'<'}
                  nextPageText={'>'}
                  firstPageText={'<<'}
                  lastPageText={'>>'}
                  onChange={HotelPageChange}
                />
              </TabContent>
              {/* ================================카페================================ */}
              <TabContent for="basket_tab2">
                <select className="basketlistCount" onChange={CafeChange}>
                  <option value="3">리스트 3개</option>
                  <option value="5">리스트 5개</option>
                  <option value="10">리스트 10개</option>
                </select>
                {searchData
                  .filter((SEARCH_IDX) => SEARCH_IDX.SEARCH_CATEGORY === 'Cafe')
                  .slice(
                    cafelist * (cafepage - 1),
                    cafelist * (cafepage - 1) + cafelist,
                  )
                  .map((SEARCH_IDX) => (
                    <div key={SEARCH_IDX.id}>
                      <ul>
                        <li
                          className="list_title"
                          onClick={() => {
                            window.open(SEARCH_IDX.SEARCH_LINK, '_blank');
                          }}
                        >
                          {SEARCH_IDX.SEARCH_TITLE}
                        </li>
                        <li>{SEARCH_IDX.SEARCH_TXT}</li>
                      </ul>
                      <button className="basket_edit" onClick={basketDataedit}>
                        수정
                      </button>
                      <button
                        className="basket_delete"
                        onClick={BasketDelete}
                        id={SEARCH_IDX.SEARCH_IDX}
                      >
                        삭제
                      </button>
                      <hr />
                    </div>
                  ))}
                <Pagination
                  activePage={cafepage}
                  itemsCountPerPage={cafelist}
                  totalItemsCount={searchData.length - 1}
                  pageRangeDisplayed={5}
                  prevPageText={'<'}
                  nextPageText={'>'}
                  firstPageText={'<<'}
                  lastPageText={'>>'}
                  onChange={CafePageChange}
                />
              </TabContent>
              {/* ================================식당================================ */}
              <TabContent for="basket_tab3">
                <select className="basketlistCount" onChange={DiningChange}>
                  <option value="3">리스트 3개</option>
                  <option value="5">리스트 5개</option>
                  <option value="10">리스트 10개</option>
                </select>
                {searchData
                  .filter(
                    (SEARCH_IDX) => SEARCH_IDX.SEARCH_CATEGORY === 'Dining',
                  )
                  .slice(
                    dininglist * (diningpage - 1),
                    dininglist * (diningpage - 1) + dininglist,
                  )
                  .map((SEARCH_IDX) => (
                    <div key={SEARCH_IDX.id}>
                      <ul>
                        <li
                          className="list_title"
                          onClick={() => {
                            window.open(SEARCH_IDX.SEARCH_LINK, '_blank');
                          }}
                        >
                          {SEARCH_IDX.SEARCH_TITLE}
                        </li>
                        <li>{SEARCH_IDX.SEARCH_TXT}</li>
                      </ul>
                      <button className="basket_edit" onClick={basketDataedit}>
                        수정
                      </button>
                      <button
                        className="basket_delete"
                        onClick={BasketDelete}
                        id={SEARCH_IDX.SEARCH_IDX}
                      >
                        삭제
                      </button>
                      <hr />
                    </div>
                  ))}
                <Pagination
                  activePage={diningpage}
                  itemsCountPerPage={dininglist}
                  totalItemsCount={searchData.length - 1}
                  pageRangeDisplayed={5}
                  prevPageText={'<'}
                  nextPageText={'>'}
                  firstPageText={'<<'}
                  lastPageText={'>>'}
                  onChange={DiningPageChange}
                />
              </TabContent>
              {/* ================================관광지================================ */}
              <TabContent for="basket_tab4">
                <select className="basketlistCount" onChange={ActivityChange}>
                  <option value="3">리스트 3개</option>
                  <option value="5">리스트 5개</option>
                  <option value="10">리스트 10개</option>
                </select>
                {searchData
                  .filter(
                    (SEARCH_IDX) => SEARCH_IDX.SEARCH_CATEGORY === 'Activity',
                  )
                  .slice(
                    activitylist * (activitypage - 1),
                    activitylist * (activitypage - 1) + activitylist,
                  )
                  .map((SEARCH_IDX) => (
                    <div key={SEARCH_IDX.id}>
                      <ul>
                        <li
                          className="list_title"
                          onClick={() => {
                            window.open(SEARCH_IDX.SEARCH_LINK, '_blank');
                          }}
                        >
                          {SEARCH_IDX.SEARCH_TITLE}
                        </li>
                        <li>{SEARCH_IDX.SEARCH_TXT}</li>
                      </ul>
                      <button className="basket_edit" onClick={basketDataedit}>
                        수정
                      </button>
                      <button
                        className="basket_delete"
                        onClick={BasketDelete}
                        id={SEARCH_IDX.SEARCH_IDX}
                      >
                        삭제
                      </button>
                      <hr />
                    </div>
                  ))}
                <Pagination
                  activePage={activitypage}
                  itemsCountPerPage={activitylist}
                  totalItemsCount={searchData.length - 1}
                  pageRangeDisplayed={5}
                  prevPageText={'<'}
                  nextPageText={'>'}
                  firstPageText={'<<'}
                  lastPageText={'>>'}
                  onChange={ActivityPageChange}
                />
              </TabContent>
            </div>
          </Tabs>
        </div>
        <div className="Model">
          {basketitem && (
            <BasketDialog closeModal={() => setBasketItem(!basketitem)}>
              <div className="Basket_modal">
                <div>
                  <h2>장바구니 수정</h2>
                </div>

                <select className="basket_Category" ref={categoryRef}>
                  <option value="" name="category">
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
                  placeholder="수정할 이름을 적어주세요"
                  name="title"
                  className="basketTitle"
                  defaultValue=""
                />

                <input
                  type="text"
                  placeholder="수정할 메모를 적어주세요"
                  name="memo"
                  className="basketMemo"
                  defaultValue=""
                />

                <button
                  type="submit"
                  value="수정하기"
                  className="basketSave_btn"
                >
                  수정
                </button>
              </div>
            </BasketDialog>
          )}
        </div>
      </div>
    );
  }
};

export default Basket;
