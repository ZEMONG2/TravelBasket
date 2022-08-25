const SearchedItem = ({
  isSearched,
  cartData,
  searchedData,
  idx,
  saveItem,
}) => {
  /*
    isSearched : 검색 상태인지 장바구니인지 체크
    cartData: 사용자의 장바구니 데이터
    searchedData : 검색된 데이터
    idx : 
    saveItem :
  */
  const saveThisPlan = (e) => {
    //saveItem(idx);//메모장 띄우기 임시 주석처리
    e.preventDefault();
  }; //여기서 데이터를 디비에 저장할 객체에 담는다.

  return (
    <>
      <div className="searchListItem">
        <div className="searchedItemInfo">
          <a
            //href={isSearched === true ? searchedData.link : cartData.CART_LINK}
            href={
              isSearched === true ? searchedData.place_url : cartData.CART_LINK
            }
          >
            <span className="itemTitle">
              {/* {isSearched === true ? searchedData.title : cartData.CART_NAME} */}
              {isSearched === true
                ? searchedData.place_name
                : cartData.CART_NAME}
            </span>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          </a>
          <span className="itemCategory">
            {/* {isSearched === true ? searchedData.category : ''} */}
            {isSearched === true ? searchedData.category_name : ''}
          </span>
          <br />
          <br />
          <span className="itemRoadAddr">
            {/* {isSearched === true
              ? searchedData.roadAddress
              : cartData.CART_ADDR_ROAD} */}
            {isSearched === true
              ? searchedData.road_address_name
              : cartData.CART_ADDR_ROAD}
          </span>
          <br />
          <span className="itemAddr">
            (지번)
            {/* {isSearched === true ? searchedData.address : cartData.CART_ADDR} */}
            {isSearched === true
              ? searchedData.address_name
              : cartData.CART_ADDR}
          </span>
          <br />
        </div>
        <div className="searchedItemBtn">
          <button className="savePlan" onClick={saveThisPlan}>
            저장
          </button>
        </div>
      </div>
      <div className="clear"></div>
    </>
  );
};
export default SearchedItem;
