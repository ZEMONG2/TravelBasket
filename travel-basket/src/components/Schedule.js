import "../css/schedule.css";
import "../css/common.css";
import React from "react";
import { useState } from "react";

const Schedule = () => {
  const pageArr = [1, 2, 3, 4]; //임시로 사용하는 페이지 배열(추후 나의 일정을 디비에서 뽑아낸 쿼리로 객체화)
  const [isActivate, setActive] = useState([true, false, false, false]); //버튼의 active/unactive 여부를 저장하는 state
  const movePage = (e) => {
    const tag_id = e.target.id; //클릭한 버튼의 태그 아이디
    const tag_class_arr = e.target.className.split(" "); //클릭한 버튼의 클래스명 배열

    if (tag_id === "move2left" || tag_id === "move2right") {
      //화살표 버튼 이벤트 처리
      console.log(e.target);
    } else {
      //페이지 버튼 이벤트 처리

      const pageNo = parseInt(e.target.attributes.getNamedItem("page").value); //클릭한 버튼의 페이지 번호

      //1. 클릭한 버튼 css 변경
      let activeArr = [];
      for (let i = 0; i < isActivate.length; i++) {
        /*
          기본적으로는 false를 넣되 현재 페이지 번호 - 1(배열의 인덱스는 0부터 시작하므로) 에는 true를 넣음
        */
        activeArr[i] = false;
        if (i === pageNo - 1) activeArr[i] = true;
      }
      setActive(activeArr);

      //2. 페이지 이동
    }
  };
  //페이지 버튼 컴포넌트
  const PageButton = (props) => {
    const { page, type, ...other } = props; //전달받은 프로퍼티를 변수화하여 사용(사용되지 않는 프로퍼티는 other로 처리)

    return <button className={"btn" + (type === undefined ? "" : " " + type)} page={page === undefined ? "" : page} {...other} />;
  };
  return (
    <div className="bodywrap">
      <div className="scheduleTitle"> 내 일정 보관함</div>
      <div className="updownSpace" />
      <div className="scheduleWrap">
        <div className="mySchedule no1">
          <div className="img">
            <a href="#!">
              <img className="" src="#" alt="" />
            </a>
          </div>
          <div className="scheduleDate">
            <a href="#!">
              <p className="scheduleLabel">2022.08.13 ~ 2022.08.16</p>
            </a>
          </div>
        </div>
      </div>
      <div className="updownSpace" />
      <div className="scheduleListWrap">
        <PageButton type="mover" id="move2left" onClick={movePage}>
          &lt;
        </PageButton>
        {/* 페이지 버튼의 동적 구현 */}
        {pageArr.map((page, idx) => (
          <PageButton type={isActivate[idx] === true ? "activate" : ""} page={page} key={idx} onClick={movePage}>
            {page}
          </PageButton>
        ))}
        <PageButton type="mover" id="move2right" onClick={movePage}>
          &gt;
        </PageButton>
      </div>
    </div>
  );
};

export default Schedule;
