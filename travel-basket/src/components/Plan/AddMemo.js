import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import SearchedItem from './container/SearchedItem';
import Select from 'react-select';
import * as utill from '../../Utils/Utils.js';
import './css/addMemo.css';
const AddMemo = ({ handleMemoPopup, selectedItem, makePlan }) => {
  const [memo, setMemo] = useState({});
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
    var dbCate = utill.getDataAsGetWithNoParams(
      utill.common_url + '/getPlanCate',
    );
    dbCate
      .then((resolvedata) => {
        if (cate.length === 0) setCate([...cate, ...resolvedata]);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const saveMemo = () => {
    memo.category = selectRef.current.value;
    memo.title = textRef.current.value;
    memo.memo = areaRef.current.value;
    //console.log(memo);
    makePlan(memo, selectedItem);
    handleMemoPopup('save');
    clearMemo();
  };

  const clearMemo = () => {
    selectRef.current.value = 'default';
    textRef.current.value = '';
    areaRef.current.value = '';
    setMemo({});
  };
  const cancelMemo = () => {
    clearMemo();
    handleMemoPopup('close');
  };
  const handleInputVal = (e) => {
    memo.category = selectRef.current.value;
    memo.title = textRef.current.value;
    memo.memo = areaRef.current.value;
    //console.log(memo);
  };
  return (
    <div className="memoWrapper">
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
          onChange={handleInputVal}
        >
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
