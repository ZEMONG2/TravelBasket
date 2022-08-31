import { useState } from 'react';
import { useLocation } from 'react-router-dom';
const PlanContainer = ({
  daycnt,
  openSearchPopup,
  data,
  setUpdateMode,
  openMemo,
  setUpdateMemoItem,
  deletePlace,
}) => {
  /*
      daycnt : n박의 n
      data : dayList[idx] => 저장할 n일차의 정보
      openSearchPopup : 팝업 컨트롤
      setUpdateMode : 메모 수정 모드 활성화/비활성화
      openMemo : 메모장 팝업 핸들링
      setUpdateMemoItem: 메모 수정할 객체
      deletePlace : 아이템 삭제
  */
  const location = useLocation();
  const openPopup = () => {
    openSearchPopup(daycnt);
  };
  const openMemoPopup = (e, idx) => {
    setUpdateMemoItem(data, idx, daycnt); //수정할 일정(n일차) -> 어딘가에서 idx 를 받아줘야함.
    openMemo('update', ['nothing']); //메모장 열기.
    //forceUpdate();
    e.preventDefault();
  };
  const deleteItem = (e, idx) => {
    //저장한 장소와 메모 삭제
    deletePlace(idx, daycnt);

    e.preventDefault();
  };
  return (
    <>
      <div className="planByDay idx">
        {/* idx에 나중에 n일차를 표기하는 숫자가 들어옴 */}
        <div className="labelDiv">
          <label className="day_Text">{data.day}</label>
        </div>
        <div className="buttonDiv">
          <div className="addDay" onClick={openPopup}>
            +
          </div>
        </div>
      </div>
      {data.area.length > 0 &&
        data.area.map(
          (val, idx) =>
            !data.memo[idx].isDeleting && (
              <div className="selectedItemArticle" key={idx}>
                <span
                  className="selectedItemLabel"
                  onClick={(e) => openMemoPopup(e, idx)}
                >
                  {val.place_name}
                </span>
                <button
                  className="deleteItem"
                  onClick={(e) => deleteItem(e, idx)}
                >
                  삭제
                </button>
                <button
                  className="updateMemo"
                  onClick={(e) => openMemoPopup(e, idx)}
                >
                  메모수정
                </button>
              </div>
            ),
        )}

      <div className="updownSpace"></div>
    </>
  );
};
export default PlanContainer;
