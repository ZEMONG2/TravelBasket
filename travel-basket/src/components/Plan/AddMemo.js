import { useRef, useState, useEffect } from 'react';

import SearchedItem from './container/SearchedItem';
import * as utill from '../../Utils/Utils.js';
import './plan_css/addMemo.scss';

const AddMemo = ({
  handleMemoPopup,
  selectedItem,
  makePlan,
  isUpdating,
  updatingData,
}) => {
  /*
  handleMemoPopup ://메모장 팝업 컨트롤
  selectedItem :  //메모할 아이템 선택
  makePlan    :  //일정별 장소와 메모 저장
  isUpdating : 수정중인지 여부를 체크
  updatingData : 수정하려는 메모데이터(수정모드가 아니면 "")
   */
  const [memo, setMemo] = useState({}); //메모

  const selectRef = useRef();
  const textRef = useRef();
  const areaRef = useRef();
  useEffect(() => {
    if (isUpdating) {
      console.log('!!!!!!!!!!!!!!!!!!!!!');
      selectRef.current.value = updatingData.category;
      textRef.current.value = updatingData.title;
      areaRef.current.value = updatingData.memo;
    }
  });

  const saveMemo = () => {
    //메모 저장 버튼을 누르면 실행.
    memo.category = parseInt(selectRef.current.value);
    memo.title = textRef.current.value;
    memo.memo = areaRef.current.value;

    if (selectRef.current.value === 'default') {
      alert('카테고리를 선택해주세요!');
      return;
    }

    //console.log(memo);
    if (isUpdating) {
      handleMemoPopup('updateComplete', { item: selectedItem, memo: memo }); //팝업창 컨트롤
    } else {
      makePlan(memo, selectedItem); //일정별 장소와 메모 저장
      handleMemoPopup('save', ['nothing']); //팝업창 컨트롤
    }

    clearMemo(); //입력값 초기화
  };

  const clearMemo = () => {
    //입력값 초기화
    selectRef.current.value = 'default';
    textRef.current.value = '';
    areaRef.current.value = '';
    setMemo({});
  };
  const cancelMemo = () => {
    //메모 입력 취소
    clearMemo();
    handleMemoPopup('close');
  };
  return (
    <div className="memoWrapper">
      {/* 저장하고자 하는 아이템을 그대로 가져와서 보여줌(컨테이너 재활용) */}
      <SearchedItem
        isSearched={'메모장모드'}
        cartData={''}
        searchedData={selectedItem}
        idx={0}
        saveItem={selectedItem}
      />

      <div className="memoDiv">
        <select
          className="memoPlace memoInput"
          ref={selectRef}
          defaultValue={'default'}
        >
          <option value="default">카테고리를 선택해주세요</option>
          <option value={1}>숙소</option>
          <option value={2}>카페</option>
          <option value={3}>식당</option>
          <option value={4}>관광</option>
          <option value={5}>기타</option>
          {/* {cate.map((val, idx) => (
            <option key={idx} value={val.P_CATE_IDX}>
              {val.P_CATEGORY}
            </option>
          ))} */}
        </select>
      </div>
      <div className="memoDiv hidden">
        <input
          className="memoTitle memoInput"
          ref={textRef}
          type="text"
          placeholder="저장할 이름을 적어주세요"
          defaultValue={''}
        />
      </div>
      <div className="memoDiv">
        <textarea
          className="memoArea memoInput"
          ref={areaRef}
          placeholder="메모를 적어보세요 ex)사진찍기, 먹어보기"
          defaultValue={''}
        />
      </div>
      <div className="memoBtnWrap">
        <button className="saveMemo memobtn" onClick={saveMemo}>
          저장
        </button>
        <button className="cancelMemo memobtn" onClick={cancelMemo}>
          취소
        </button>
      </div>
    </div>
  );
};
export default AddMemo;
