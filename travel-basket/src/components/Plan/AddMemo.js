import { useRef, useState } from 'react';
import './css/addMemo.css';
// import '../Plan/plan_css/addMemo.scss';

const AddMemo = ({ handleMemoPopup, selectedItem }) => {
  const [memo, setMemo] = useState({});
  const selectRef = useRef();
  const textRef = useRef();
  const areaRef = useRef();
  const saveMemo = () => {
    memo.place = selectRef.current.value;
    memo.title = textRef.current.value;
    memo.memo = areaRef.current.value;
    console.log(memo);
  };
  const cancelMemo = () => {
    selectRef.current.value = '장소1';
    textRef.current.value = '';
    areaRef.current.value = '';
    setMemo({});
    handleMemoPopup('close');
  };
  const handleInputVal = (e) => {
    // setSelect(selectRef.current.value);
    // setText(textRef.current.value);
    // setArea(areaRef.current.value);
    memo.place = selectRef.current.value;
    memo.title = textRef.current.value;
    memo.memo = areaRef.current.value;
    console.log(memo);
  };
  return (
    <>
      <select ref={selectRef} onChange={handleInputVal}>
        <option value={'장소1'}>장소1</option>
        <option value={'장소2'}>장소2</option>
        <option value={'장소3'}>장소3</option>
      </select>
      <input ref={textRef} type="text" />
      <input ref={areaRef} type="text" />
      <div>
        <button className="saveMemo memobtn" onClick={saveMemo}>
          저장
        </button>
        <button className="cancelMemo memobtn" onClick={cancelMemo}>
          취소
        </button>
      </div>
    </>
  );
};
export default AddMemo;
