import React from "react";

const Schedule = () => {
  return (
    <div>
      <h1>일정 공유 게시판</h1>
      <h3>지역</h3> <input type="text" placeholder="지역을 입력하세요"></input>
      <h3>동행 타입</h3>
      <button name="alone">혼자</button>
      <button name="friend">친구</button>
      <button name="couple">연인</button>
      <button name="family">가족</button>
      <button name="pet">반려동물</button>
      <h3>교통 수단</h3>
      <button name="walk">도보</button>
      <button name="bike">자전거</button>
      <button name="cycle">오토바이</button>
      <button name="transit">대중교통</button>
      <button name="car">자동차</button>
    </div>
  );
};

export default Schedule;
