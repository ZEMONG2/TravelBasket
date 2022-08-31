import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import SearchedItem from './container/SearchedItem';
import './plan_css/addPlan.scss';
import * as utill from '../../Utils/Utils';
// import './css/addPlan.css';
// =======
// // import './css/addPlan.css';
// import './plan_css/addPlan.scss';
// >>>>>>> main

var cartCnt = 0; //장바구니 갯수
var searchPage = 1; //현재 조회중인 페이지(서버에서 api 활용 검색에 사용)
var beforeKeyword = ''; //전에 검색한 키워드(페이지 초기화에 쓰임)
var nowPage = 0; // 현재 보고있는 페이지
const itemListClassName = 'searchList'; //검색된 데이터 리스트 태그의 클래스명(on/off에 사용)
const AddPlan = forwardRef(
  //forwardRef는 자식 컨테이너의 함수를 부모 컨테이너에서 사용하게 해줌
  /*
    const childContainer = forwardRef(({props}, ref) => { function whatParentWant(); return;}) 
    의 형식으로 사용가능. 부모에서는 자식 컨테이너에 ref를 세팅해주고 
    ref.current.함수명(); 으로 사용가능
  */

  (
    {
      selectedDays,
      closeSerchPopup,
      setMemoData,
      controllClassName,
      isSearching,
      setMode,
    },
    ref,
  ) => {
    /*
      selectedDays : 선택한 n일차
      closeSerchPopup: 여기서 팝업창 여닫기 컨트롤
      setMemoData : 데이터 저장 함수
      controllClassName : 검색창 내부에서 메모창 팝업 컨트롤하기위해 보내주는 함수
      isSearching : 현재 검색중인지 메모장을 켰는지를 체크
      setMode : 검색/메모장 모드 세트
  */
    const testarr = [1, 2, 3, 4, 5, 6];
    const [cartArr, setCart] = useState([]);
    const [searchedData, setData] = useState([]); //검색된 데이터 리스트
    const [searchLabel, setLabel] = useState('나의 장바구니'); //장바구니 보여주기 상태라면 사용되는 state

    const keyword = useRef(); //검색어
    const itemList = useRef(); //검색 결과를 감싸주는 태그

    const init = () => {
      //초기화는 부모컨테이너에서도 사용하게 할것.
      keyword.current.value = '';
      setLabel('나의 장바구니');
    };
    useImperativeHandle(ref, () => ({
      //이 함수 안에 포함되는 이 컨테이너 안의 함수들은 부모 컨테이너에서 사용 가능.
      init,
    }));
    const closePopup = () => {
      //팝업창 닫기
      closeSerchPopup(0);
      init();
    };
    const handleMemoPopup = () => {
      //메모 창 띄우고 없애기
      setMode(!isSearching);
    };
    const saveItem = (idx) => {
      //검색한 장소 저장버튼을 누르면 실행
      handleMemoPopup();
      setMemoData(searchedData[idx]); //데이터 저장
    };
    const getCart = () => {
      //장바구니 가져오기
      //추후 장바구니에 더미데이터 쌓이면 테스트
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
      //장소 검색(새로)
      var search = keyword.current.value;
      if (search === '') {
        alert('검색어를 입력해주세요!!');
        return;
      }
      //검색결과 화면이 안보이게 되어있으면 보이게 재설정
      if (itemList.current.className.split(' ')[1] === 'displayNone') {
        //controllClassName(itemList, 'searchList', 'displayNone');
        setMode(true);
      }
      searchPage = 1; //검색하고자 하는 페이지는 1번페이지
      axios
        .post(`http://localhost:8000/searchbykakao`, {
          keyword: search,
          page: searchPage,
        })
        .then((res) => {
          const { data } = res;
          //새로운 검색어를 입력하면 검색 결과를 초기화
          setData(data.documents);
          beforeKeyword = search;
          // searchPage = 1;
        })
        .catch((e) => {
          console.error(e);
        });
      //console.log(searchedData);
      setLabel('검색 결과');

      if (e.key !== 'Enter') e.preventDefault(); //검색창에서 엔터쳐서 검색한게 아니면 실행
    };
    const searchByEnter = (e) => {
      //엔터쳐서 검색 실행
      if (e.key === 'Enter') {
        searchArea(e);
      }
    };
    const showMorePage = (e) => {
      //아래는 더보기 실행 로직
      searchPage += 1; //페이지 넘기기

      var search = keyword.current.value;
      axios
        .post(`http://localhost:8000/searchbykakao`, {
          keyword: search,
          page: searchPage,
        })
        .then((res) => {
          const { data } = res;
          //const newArr = [...searchedData, ...data.items];
          console.log(data);
          //더보기이므로 데이터를 리스트에 추가함
          setData([...searchedData, ...data.documents]);
        })
        .catch((e) => {
          console.error(e);
        });
      //console.log(searchedData);

      if (e.key !== 'Enter') e.preventDefault();
    };

    return (
      <div>
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
        <div className="searchLabel">
          <div id="searchlabeldiv">{searchLabel}</div>
        </div>
        <br />
        {/* <div className="searchList " ref={itemList}> */}
        <div
          className={isSearching ? 'searchList' : 'searchList displayNone'}
          ref={itemList}
        >
          {searchLabel === '나의 장바구니' ? (
            getCart() > 0 ? (
              testarr.map((val, idx) => (
                <SearchedItem
                  isSearched={false}
                  cartData={val}
                  searchedData={''}
                  key={idx}
                />
              ))
            ) : (
              <p>장바구니에 저장된 장소가 없어요!</p>
            )
          ) : (
            searchedData.map((val, idx) => (
              <SearchedItem
                isSearched={true}
                cartData={''}
                searchedData={val}
                key={idx}
                idx={idx}
                saveItem={saveItem}
              />
            ))
          )}
          {searchLabel !== '나의 장바구니' ? (
            <div>
              <div className="showMeMore">
                <button className="searchMore" onClick={showMorePage}>
                  더보기
                </button>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  },
);
export default AddPlan;
