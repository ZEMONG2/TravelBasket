import SearchedItem from './SearchedItem';
import '../../css/addPlan.css';
const AddPlan = ({ selectedDays, closeSerchPopup, savePlace }) => {
  const testarr = [1, 2, 3, 4, 5, 6];
  const closePopup = () => {
    closeSerchPopup(0);
  };
  const saveData = () => {
    savePlace([]);
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
          ></input>
          <button id="searchbtn">검색</button>
        </div>
      </div>
      <div className="updownSpace"></div>
      <div className="searchLabel">
        <div id="searchlabeldiv">나의 장바구니</div>
      </div>
      <div className="updownSpace"></div>
      <div className="searchList">
        {testarr.map((val, idx) => (
          <SearchedItem key={idx} />
        ))}
      </div>
    </div>
  );
};
export default AddPlan;
