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
    saveItem(idx);
    e.preventDefault();
  }; //여기서 데이터를 디비에 저장할 객체에 담는다.

  return (
    <>
      <div className="searchListItem">
        <div className="searchedItemInfo">
          <a
            //href={isSearched === true ? searchedData.link : cartData.CART_LINK}
            href={
              isSearched === true || isSearched === '메모장모드'
                ? searchedData.place_url
                : cartData.CART_LINK
            }
            target="_blank"
          >
            <span className="itemTitle">
              {/* {isSearched === true ? searchedData.title : cartData.CART_NAME} */}
              {isSearched === true || isSearched === '메모장모드'
                ? searchedData.place_name
                : cartData.CART_NAME}
            </span>
            &nbsp; &nbsp; &nbsp;
          </a>
          <span className="itemCategory">
            {/* {isSearched === true ? searchedData.category : ''} */}
            {isSearched === true || isSearched === '메모장모드'
              ? searchedData.category_name
              : ''}
          </span>
          <br />
          {/* <br /> */}
          <span className="itemRoadAddr">
            {/* {isSearched === true
              ? searchedData.roadAddress
              : cartData.CART_ADDR_ROAD} */}
            {isSearched === true || isSearched === '메모장모드'
              ? searchedData.road_address_name
              : cartData.CART_ADDR_ROAD}
          </span>
          <br />
          <span className="itemAddr">
            (지번)
            {/* {isSearched === true ? searchedData.address : cartData.CART_ADDR} */}
            {isSearched === true || isSearched === '메모장모드'
              ? searchedData.address_name
              : cartData.CART_ADDR}
          </span>
        </div>
        {isSearched === '메모장모드' ? (
          <></>
        ) : (
          <div className="searchedItemBtn">
            <button className="savePlan" onClick={saveThisPlan}>
              저장
            </button>
          </div>
        )}
      </div>
      <div className="clear"></div>
    </>
  );
};
export default SearchedItem;
