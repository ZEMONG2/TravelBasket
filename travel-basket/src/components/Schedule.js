import React from "react";
import "../css/Schedule.scss";

const Schedule = () => {
  return (
    <div className="as">
      <h1>일정 공유 게시판</h1>
      <h3 className="area">지역 검색</h3>
      <input
        className="search"
        type="text"
        placeholder="지역을 입력하세요"
      ></input>
      <br />

      <h3 className="companion">동행 타입</h3>
      <button className="btn" name="alone">
        혼자
      </button>
      <button className="btn" name="friend">
        친구
      </button>
      <button className="btn" name="couple">
        연인
      </button>
      <button className="btn" name="family">
        가족
      </button>
      <button className="btn" name="pet">
        반려동물
      </button>
      <br />

      <h3 className="transport">교통 수단</h3>
      <button className="btn" name="walk">
        도보
      </button>
      <button className="btn" name="bike">
        자전거
      </button>
      <button className="btn" name="cycle">
        오토바이
      </button>
      <button className="btn" name="transit">
        대중교통
      </button>
      <button className="btn" name="car">
        자동차
      </button>
    </div>
  );
};

export default Schedule;
