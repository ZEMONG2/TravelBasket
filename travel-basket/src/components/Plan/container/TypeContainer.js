const TypeContainer = ({ type, val, idx, selected, handleType, isMaking }) => {
  /*
    type : 여행 타입인지 이동수단인지를 전달(여행타입과 이동수단이 같은 컨테이너를 사용)
    val : 여행타입
    idx : 선택시 데이터 처리를 위한 인덱스
    selected : 선택시 css 처리를 위한 속성
    handleType : 버튼 클릭시 발생하는 이벤트
  */
  const setType = (e) => {
    if (!isMaking) return;
    e.preventDefault();
    handleType(type, val, idx);
  };
  return (
    <button
      className={`typeBtn` + (selected === true ? ' activate' : '')}
      onClick={setType}
    >
      {val}
    </button>
  );
};
export default TypeContainer;
