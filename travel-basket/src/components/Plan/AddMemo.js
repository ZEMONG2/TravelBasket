import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import SearchedItem from './container/SearchedItem';
import Select from 'react-select';
import * as utill from '../../Utils/Utils.js';
import './css/addMemo.css';
const AddMemo = ({ handleMemoPopup, selectedItem, makePlan }) => {
  /*
  handleMemoPopup ://메모장 팝업 컨트롤
  selectedItem :  //메모할 아이템 선택
  makePlan    :  //일정별 장소와 메모 저장
   */
  const [memo, setMemo] = useState({}); //메모
  const [cate, setCate] = useState([
    // {
    //   P_CATE_IDX: 0,
    //   P_CATEGORY: '카테고리를 선택해주세요',
    // },
  ]);
  const selectRef = useRef();
  const textRef = useRef();
  const areaRef = useRef();

  useEffect(() => {
    //렌더링 후에 db에서 추출한 카테고리 리스트를 select option 에 반영
    utill //여기서 서버랑 get 통신을 실행
      // 반복코드 줄이려고 만든건데 오히려 더 구린 코드같아서 나중에 다시 수정.
      // 왜냐하면 비동기로 작업을 수행하면
      //utill.getDataAsGetWithNoParams 내부의 then은 AddMemo의 then이 끝날때까지 대기하기 때문
      .getDataAsGetWithNoParams(utill.common_url + '/getPlanCate')
      .then((resolvedata) => {
        if (cate.length === 0) setCate([...cate, ...resolvedata]);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const saveMemo = () => {
    //메모 저장 버튼을 누르면 실행.
    memo.category = selectRef.current.value;
    memo.title = textRef.current.value;
    memo.memo = areaRef.current.value;
    //console.log(memo);
    makePlan(memo, selectedItem); //일정별 장소와 메모 저장
    handleMemoPopup('save'); //팝업창 컨트롤
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
        <select className="memoPlace memoInput" ref={selectRef}>
          <option value="default">카테고리를 선택해주세요</option>
          {cate.map((val, idx) => (
            <option key={idx} value={val.P_CATE_IDX}>
              {val.P_CATEGORY}
            </option>
          ))}
        </select>
      </div>
      <div className="memoDiv">
        <input
          className="memoTitle memoInput"
          ref={textRef}
          type="text"
          placeholder="저장할 이름을 적어주세요"
        />
      </div>
      <div className="memoDiv">
        <textarea
          className="memoArea memoInput"
          ref={areaRef}
          placeholder="메모를 적어보세요 ex)사진찍기, 먹어보기"
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
