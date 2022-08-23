import { useState, useRef } from 'react';
import axios from 'axios';
import SearchedItem from './SearchedItem';
import './addPlan.css';

var cartCnt = 0;
var searchPage = 1;
var beforeKeyword = '';
const AddPlan = ({ selectedDays, closeSerchPopup, savePlace }) => {
  const testarr = [1, 2, 3, 4, 5, 6];
  const [cartArr, setCart] = useState([]);
  const [searchedData, setData] = useState([]);
  const [searchLabel, setLabel] = useState('나의 장바구니');
  const keyword = useRef();
  const closePopup = () => {
    closeSerchPopup(0);
  };
  const saveData = () => {
    savePlace([]);
  };
  const getCart = () => {
    const login_id = 'ksw3108'; //추후 세션 체크해서 아이디 가져오기

    axios
      .post('http://localhost:8000/getcart', {
        id: login_id,
      })
      .then((res) => {
        const { data } = res;
        if (data.length > 0) {
          cartCnt = data.length;
          setCart(data);
        }
      })
      .catch((e) => {
        console.error(e);
      });
    return cartCnt;
  };
  const searchArea = (e) => {
    var search = keyword.current.value;

    axios
      .post(`http://localhost:8000/searchbynaver`, {
        keyword: search,
        page: searchPage,
      })
      .then((res) => {
        const { data } = res;
        //const newArr = [...searchedData, ...data.items];
        console.log(data);
        //새로운 검색어를 입력하면 검색 결과를 초기화
        if (beforeKeyword !== search) {
          setData(data.items);
          beforeKeyword = search;
          searchPage = 1;
        } else {
          setData([...searchedData, ...data.items]);
        }
        /*
        data[//네이버 지역 검색으로 가져온 상호 객체리스트
          {
            address: "대전광역시 중구 은행동 145" //일반주소
            category: "음식점>카페,디저트>베이커리"//네이버 카테고리 분류
            description: ""//상세설명?자세히는 모르겠음 안쓰일듯?
            link: "https://www.instagram.com/sungsimdang_official/"//등록된 공식 홈페이지
            mapx: "348782"//위도(네이버식 위도 설정(파싱 필요))
            mapy: "414271"//경도(네이버식 경도 설정(파싱 필요))
            roadAddress: "대전광역시 중구 대종로480번길 15"//도로명주소
            telephone: ""//등록된 전화번호
            title: "성심당 본점" //상호명
          }
        ]
        */
      })
      .catch((e) => {
        console.error(e);
      });
    console.log(searchedData);
    setLabel('검색 결과');

    if (e.key !== 'Enter') e.preventDefault();
  };
  const searchByEnter = (e) => {
    if (e.key === 'Enter') {
      searchArea(e);
    }
  };
  const showMorePage = (e) => {
    searchPage += 1;
    searchArea(e);
  };
  return (
    <div className="container_center">
      <div className="updownSpace"></div>
      <div className="searchHeader">
        <div className="searcherWrap">
          <button id="goback" onClick={closePopup}>
            &lt;
          </button>
          <input
            id="searchInput"
            type="text"
            placeholder="가고싶은 곳을 검색해보세요!"
            ref={keyword}
            onKeyPress={searchByEnter}
          ></input>
          <button id="searchbtn" onClick={searchArea}>
            검색
          </button>
        </div>
      </div>
      <div className="updownSpace"></div>
      <div className="searchLabel">
        <div id="searchlabeldiv">{searchLabel}</div>
      </div>
      <div className="updownSpace"></div>
      <div className="searchList">
        {searchLabel === '나의 장바구니'
          ? getCart() > 0
            ? testarr.map((val, idx) => (
                <SearchedItem
                  isSearched={false}
                  cartData={val}
                  searchedData={''}
                  key={idx}
                />
              ))
            : '장바구니에 저장된 장소가 없어요!'
          : searchedData.map((val, idx) => (
              <SearchedItem
                isSearched={true}
                cartData={''}
                searchedData={val}
                key={idx}
              />
            ))}
        {searchLabel !== '나의 장바구니' ? (
          <div>
            <div className="showMeMore">
              <button className="searchMore" onClick={showMorePage}>
                더보기
              </button>
            </div>
            <div className="updownSpace"></div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
export default AddPlan;
