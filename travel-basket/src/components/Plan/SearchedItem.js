const SearchedItem = ({ isSearched, cartData, searchedData }) => {
  const setMarker = () => {
    console.log('tetette');
  }; //여기서 마커 세팅
  const saveThisPlan = () => {}; //여기서 데이터를 디비에 저장할 객체에 담는다.

  return (
    <>
      <div className="searchListItem">
        <div className="searchedItemInfo">
          <a
            href={isSearched === true ? searchedData.link : cartData.CART_LINK}
          >
            <span className="itemTitle">
              {isSearched === true ? searchedData.title : cartData.CART_NAME}
            </span>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          </a>
          <span className="itemCategory">
            {isSearched === true ? searchedData.category : ''}
          </span>
          <br />
          <br />
          <span className="itemRoadAddr">
            {isSearched === true
              ? searchedData.roadAddress
              : cartData.CART_ADDR_ROAD}
          </span>
          <br />
          <span className="itemAddr">
            (지번)
            {isSearched === true ? searchedData.address : cartData.CART_ADDR}
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
