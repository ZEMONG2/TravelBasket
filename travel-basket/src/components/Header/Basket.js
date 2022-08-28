import {
  MdLocalGroceryStore,
  MdLocalHotel,
  MdLocalCafe,
  MdLocalDining,
  MdLocalActivity,
} from 'react-icons/md';
import '../Header/header_css/Basket.scss';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Tabs, TabContent, TabLink } from 'react-tabs-redux';

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
      <>
        <h1>나의 장바구니</h1>
        <div className="basket_tab_all">
          <Tabs renderActiveTabContentOnly={true} className="basket_Tabs">
            <ul className="basket_tab_list">
              <li className="basket_tab">
                <TabLink to="basket_tab1" default><MdLocalHotel className='b_icon'/></TabLink>
              </li>
              <li className="basket_tab">
                <TabLink to="basket_tab2"><MdLocalCafe className='b_icon'/></TabLink>
              </li>
              <li className="basket_tab">
                <TabLink to="basket_tab3"><MdLocalDining className='b_icon'/></TabLink>
              </li>
              <li className="basket_tab">
                <TabLink to="basket_tab4"><MdLocalActivity className='b_icon'/></TabLink>
              </li>
            </ul>

            <div className="basket_tab_content">
              <TabContent for="basket_tab1">
                {searchData
                  .filter(
                    (SEARCH_IDX) => SEARCH_IDX.SEARCH_CATEGORY === 'Hotel',
                  )
                  .map((SEARCH_IDX) => (
                    <div key={SEARCH_IDX.id}>
                      <li 
                        onClick={() => {
                          window.open(SEARCH_IDX.SEARCH_LINK, '_blank');
                        }}
                      >
                        <li className='list_title'>{SEARCH_IDX.SEARCH_TITLE}</li>
                        <li> 메모 :  {SEARCH_IDX.SEARCH_TXT}</li>
                        <hr/>
                      </li>
                    </div>
                  ))}
              </TabContent>
              <TabContent for="basket_tab2">
                {searchData
                  .filter((SEARCH_IDX) => SEARCH_IDX.SEARCH_CATEGORY === 'Cafe')
                  .map((SEARCH_IDX) => (
                    <div key={SEARCH_IDX.id}>
                      <li
                        onClick={() => {
                          window.open(SEARCH_IDX.SEARCH_LINK, '_blank');
                        }}
                      >
                        <li className='list_title'>{SEARCH_IDX.SEARCH_TITLE}</li>
                        <li>{SEARCH_IDX.SEARCH_TXT}</li>
                        <hr/>
                      </li>
                    </div>
                  ))}
              </TabContent>
              <TabContent for="basket_tab3">
                {searchData
                  .filter(
                    (SEARCH_IDX) => SEARCH_IDX.SEARCH_CATEGORY === 'Dining',
                  )
                  .map((SEARCH_IDX) => (
                    <div key={SEARCH_IDX.id}>
                      <li
                        onClick={() => {
                          window.open(SEARCH_IDX.SEARCH_LINK, '_blank');
                        }}
                      >
                        <li className='list_title'>{SEARCH_IDX.SEARCH_TITLE}</li>
                        <li>{SEARCH_IDX.SEARCH_TXT}</li>
                        <hr/>
                      </li>
                    </div>
                  ))}
              </TabContent>
              <TabContent for="basket_tab4">
                {' '}
                {searchData
                  .filter(
                    (SEARCH_IDX) => SEARCH_IDX.SEARCH_CATEGORY === 'Activity',
                  )
                  .map((SEARCH_IDX) => (
                    <div key={SEARCH_IDX.id}>
                      <li
                        onClick={() => {
                          window.open(SEARCH_IDX.SEARCH_LINK, '_blank');
                        }}
                      >
                        <li className='list_title'>{SEARCH_IDX.SEARCH_TITLE}</li>
                        <li>{SEARCH_IDX.SEARCH_TXT}</li>
                        <hr/>
                      </li>
                    </div>
                  ))}
              </TabContent>
            </div>
          </Tabs>
        </div>

      </>
    );
  }
};

export default Basket;
