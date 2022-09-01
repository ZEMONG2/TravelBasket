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

const Basket = () => {
  const [searchData, setSearchData] = useState([]); //데이터
  const user_idx = window.sessionStorage.getItem('USER_IDX');

  useEffect(() => {
    basketdata();
  }, []);

  // DB
  const basketdata = () => {
    axios
      .post('http://localhost:8000/basket/select/start', {
        user_idx,
      })
      .then((res) => {
        console.log('처음불러오기 =>', res);

        const { data } = res;
        if (res.data.length > 0) {
          setSearchData(data);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // console.log('DB 바구니 데이터 확인  :', searchData);
  //-------------------------------테스트-----------------------

  const categoryChange = (e) => {
    console.log('====확인', e.currentTarget.id);
    const basketCategory = e.currentTarget.id;
    axios
      .post('http://localhost:8000/basket/select/category', {
        user_idx,
        basketCategory,
      })
      .then((res) => {
        console.log('res =>', res);

        const { data } = res;
        if (res.data.length > 0) {
          setSearchData(data);
        } else {
          setSearchData(data);
          alert('선택한 카테고리에 데이터가 없습니다.');
          basketdata();
        }
        setCategoryPage(1);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  //-------------------------------테스트-----------------------

  //장바구니 삭제

  const BasketDelete = (e) => {
    console.log('삭제 데이터 확인 id', e.target.id);
    if (window.confirm('정말 삭제하시겠습니까?')) {
      axios
        .post('http://localhost:8000/basket/delete', {
          idx: e.target.id,
        })
        .then((res) => {
          console.log(res);
          alert('삭제가 완료되었습니다!');
          basketdata();
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  //모달창?
  const [basketitem, setBasketItem] = useState(false); //모달창 데이터

  const categoryRef = useRef();
  const titleRef = useRef();
  const txtRef = useRef();
  const [title, setTitle] = useState('');
  const [txt, setTxt] = useState('');
  const [cate, setCate] = useState('');
  const [idx, setIdx] = useState(0);
  const basketDataedit = (e) => {
    setBasketItem(!basketitem);

    console.log('확인=========', e.target.id);
    const searchIdx = e.target.id;
    axios
      .post('http://localhost:8000/basket/select', {
        idx: searchIdx,
      })
      .then((res) => {
        console.log(res);
        setTitle(res.data[0].SEARCH_TITLE);
        setTxt(res.data[0].SEARCH_TXT);
        setCate(res.data[0].SEARCH_CATEGORY);
        setIdx(searchIdx);
        const cateCK = res.data[0].SEARCH_CATEGORY; // 비교값 할당
        console.log('옵션수', categoryRef.current.length);

        const len = categoryRef.current.length; //select box의 option 갯수
        //sel수ct box의 option 갯수만큼 for문 돌림
        for (let i = 1; i < len; i++) {
          //select box의 option value가 입력 받은 value의 값과 일치할 경우 selected

          if (categoryRef.current[i].value == cateCK) {
            categoryRef.current[i].selected = true;
          }
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const basketEdit = () => {
    const idxData = idx;
    const cateData = categoryRef.current.value;
    const titleData = titleRef.current.value;
    const txtData = txtRef.current.value;
    axios
      .post('http://localhost:8000/basket/update', {
        idx: idxData,
        cate: cateData,
        title: titleData,
        txt: txtData,
      })
      .then((res) => {
        setBasketItem(!basketitem);
        alert('수정완료');
        setTitle(titleData);
        setTxt(txtData);
        setCate(cateData);
        basketdata();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 장바구니 다중 페이지 구현
  // 장바구니 리스트가 4개라 리스트별로 데이터 나눠서 조작하기 위해 4개로 분리

  // 페이징
  const [categoryPage, setCategoryPage] = useState(1);
  const [categoryList, setCategoryList] = useState(5);

  const CategoryPageChange = (categoryPage) => {
    setCategoryPage(categoryPage);
    console.log(categoryPage);
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
              <li
                className="basket_tab basket_name"
                id="hotel"
                onClick={categoryChange}
              >
                <TabLink to="basket_tab1" default>
                  숙소
                  <MdLocalHotel className="b_icon active" />
                </TabLink>
              </li>
              <li
                className="basket_tab basket_name"
                id="cafe"
                onClick={categoryChange}
              >
                <TabLink to="basket_tab2">
                  카페
                  <MdLocalCafe className="b_icon" />
                </TabLink>
              </li>
              <li
                className="basket_tab basket_name"
                id="dining"
                onClick={categoryChange}
              >
                <TabLink to="basket_tab3">
                  식당
                  <MdLocalDining className="b_icon" />
                </TabLink>
              </li>
              <li
                className="basket_tab basket_name"
                id="activity"
                onClick={categoryChange}
              >
                <TabLink to="basket_tab4">
                  관광
                  <MdLocalActivity className="b_icon" />
                </TabLink>
              </li>
            </ul>

            <div className="basket_tab_content">
              <TabContent for="basket_tab1">
                {searchData
                  .slice(
                    categoryList * (categoryPage - 1),
                    categoryList * (categoryPage - 1) + categoryList,
                  )
                  .map((SEARCH_IDX) => (
                    <div key={SEARCH_IDX.id}>
                      <ul className="basket_list">
                        <li
                          className="basket_li_title"
                          onClick={() => {
                            window.open(SEARCH_IDX.SEARCH_LINK, '_blank');
                          }}
                        >
                          {SEARCH_IDX.SEARCH_TITLE}
                        </li>
                        <li className="basket_li_content">
                          메모 : {SEARCH_IDX.SEARCH_TXT}
                        </li>
                      </ul>
                      <div className="btn_wrap">
                        <button
                          id={SEARCH_IDX.SEARCH_IDX}
                          className="basket_edit"
                          onClick={basketDataedit}
                        >
                          수정
                        </button>
                        <button
                          id={SEARCH_IDX.SEARCH_IDX}
                          className="basket_delete"
                          onClick={BasketDelete}
                        >
                          삭제
                        </button>
                      </div>
                      <hr />
                    </div>
                  ))}
                <Pagination
                  activePage={categoryPage}
                  itemsCountPerPage={categoryList}
                  totalItemsCount={searchData.length}
                  prevPageText={'<'}
                  nextPageText={'>'}
                  firstPageText={'<<'}
                  lastPageText={'>>'}
                  onChange={CategoryPageChange}
                />
              </TabContent>
              <TabContent for="basket_tab2">
                {searchData
                  .slice(
                    categoryList * (categoryPage - 1),
                    categoryList * (categoryPage - 1) + categoryList,
                  )
                  .map((SEARCH_IDX) => (
                    <div key={SEARCH_IDX.id}>
                      <ul className="basket_list">
                        <li
                          className="basket_li_title"
                          onClick={() => {
                            window.open(SEARCH_IDX.SEARCH_LINK, '_blank');
                          }}
                        >
                          {SEARCH_IDX.SEARCH_TITLE}
                        </li>
                        <li className="basket_li_content">
                          메모 : {SEARCH_IDX.SEARCH_TXT}
                        </li>
                      </ul>
                      <div className="btn_wrap">
                        <button
                          id={SEARCH_IDX.SEARCH_IDX}
                          className="basket_edit"
                          onClick={basketDataedit}
                        >
                          수정
                        </button>
                        <button
                          id={SEARCH_IDX.SEARCH_IDX}
                          className="basket_delete"
                          onClick={BasketDelete}
                        >
                          삭제
                        </button>
                      </div>
                      <hr />
                    </div>
                  ))}
                <Pagination
                  activePage={categoryPage}
                  itemsCountPerPage={categoryList}
                  totalItemsCount={searchData.length}
                  prevPageText={'<'}
                  nextPageText={'>'}
                  firstPageText={'<<'}
                  lastPageText={'>>'}
                  onChange={CategoryPageChange}
                />
              </TabContent>
              <TabContent for="basket_tab3">
                {searchData
                  .slice(
                    categoryList * (categoryPage - 1),
                    categoryList * (categoryPage - 1) + categoryList,
                  )
                  .map((SEARCH_IDX) => (
                    <div key={SEARCH_IDX.id}>
                      <ul className="basket_list">
                        <li
                          className="basket_li_title"
                          onClick={() => {
                            window.open(SEARCH_IDX.SEARCH_LINK, '_blank');
                          }}
                        >
                          {SEARCH_IDX.SEARCH_TITLE}
                        </li>
                        <li className="basket_li_content">
                          메모 : {SEARCH_IDX.SEARCH_TXT}
                        </li>
                      </ul>
                      <div className="btn_wrap">
                        <button
                          id={SEARCH_IDX.SEARCH_IDX}
                          className="basket_edit"
                          onClick={basketDataedit}
                        >
                          수정
                        </button>
                        <button
                          id={SEARCH_IDX.SEARCH_IDX}
                          className="basket_delete"
                          onClick={BasketDelete}
                        >
                          삭제
                        </button>
                      </div>
                      <hr />
                    </div>
                  ))}
                <Pagination
                  activePage={categoryPage}
                  itemsCountPerPage={categoryList}
                  totalItemsCount={searchData.length}
                  prevPageText={'<'}
                  nextPageText={'>'}
                  firstPageText={'<<'}
                  lastPageText={'>>'}
                  onChange={CategoryPageChange}
                />
              </TabContent>
              <TabContent for="basket_tab4">
                {searchData
                  .slice(
                    categoryList * (categoryPage - 1),
                    categoryList * (categoryPage - 1) + categoryList,
                  )
                  .map((SEARCH_IDX) => (
                    <div key={SEARCH_IDX.id}>
                      <ul className="basket_list">
                        <li
                          className="basket_li_title"
                          onClick={() => {
                            window.open(SEARCH_IDX.SEARCH_LINK, '_blank');
                          }}
                        >
                          {SEARCH_IDX.SEARCH_TITLE}
                        </li>
                        <li className="basket_li_content">
                          메모 : {SEARCH_IDX.SEARCH_TXT}
                        </li>
                      </ul>
                      <div className="btn_wrap">
                        <button
                          id={SEARCH_IDX.SEARCH_IDX}
                          className="basket_edit"
                          onClick={basketDataedit}
                        >
                          수정
                        </button>
                        <button
                          id={SEARCH_IDX.SEARCH_IDX}
                          className="basket_delete"
                          onClick={BasketDelete}
                        >
                          삭제
                        </button>
                      </div>
                      <hr />
                    </div>
                  ))}
                <Pagination
                  activePage={categoryPage}
                  itemsCountPerPage={categoryList}
                  totalItemsCount={searchData.length}
                  prevPageText={'<'}
                  nextPageText={'>'}
                  firstPageText={'<<'}
                  lastPageText={'>>'}
                  onChange={CategoryPageChange}
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
                  <h3 className="h3_basket">장바구니 수정</h3>
                </div>

                <select
                  className="basket_Category"
                  ref={categoryRef}
                  // defaultValue={cate}
                  id="selectCate"
                >
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
                  defaultValue={title}
                  ref={titleRef}
                />

                <input
                  type="text"
                  placeholder="수정할 메모를 적어주세요"
                  name="memo"
                  className="basketMemo"
                  defaultValue={txt}
                  ref={txtRef}
                />

                <button
                  type="submit"
                  value="수정하기"
                  className="basketSave_btn"
                  onClick={basketEdit}
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
