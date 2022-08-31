// import './schedule.css';
import './schedule_css/schedule.scss';
// import '../../css/common.css';
import '../../css/common.scss';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ScheduleList from './ScheduleList';

//화살표를 활용한 페이지 이동때문에 global로 배치
var page_num = 1; //현재 보고있는 페이지
const page_size = 6; //한 페이지에 보여줄 데이터 갯수
var page_count = 1; //최종 페이지 갯수
var article_count = 0; //총 등록된 일정 갯수

function Schedule() {
  const [pageArr, setPageArr] = useState([]); //총 페이지 배열
  const [isActivate, setActive] = useState([]); //버튼의 active/unactive 여부를 저장하는 state
  const [scheduleList, setScheduleList] = useState({
    //페이징 처리된 일정 리스트의 객체
    list: [],
  });
  //const login_id = 'ksw3108'; //더미 유저 데이터, 추후 세션에서 사용자 아이디를 가져옴
  const login_id = window.sessionStorage.getItem('USER_ID');
  useEffect(() => {
    //로그인 검증 후 비로그인 상태면 메인으로 돌림. 현재 테스트환경에서 세션을 생성하지 않으므로 임의 주석처리.
    // const login_id = window.sessionStorage.getItem("id");
    // console.log("window.sessionStorage(login_id) =>", login_id);
    // if (login_id === null) {
    //   alert("로그인후 사용가능합니다!!");
    //   navigate("/");
    // }
  });

  const handlePage = (e) => {
    //페이지 이동

    if (e.target.id === 'move2left') {
      //왼쪽 화살표를 눌렀을때 페이지가 1보다 크면 이동
      if (page_num > 1) {
        page_num -= 1;
      }
    } else if (e.target.id === 'move2right') {
      //오른쪽 화살표를 눌렀을때 페이지가 최대 페이지보다 작으면 이동
      if (page_num < pageArr.length) {
        page_num += 1;
      }
    } else {
      //그 외에는 클릭한 페이지 컨테이너의 id(페이지 번호)를 반영
      page_num = parseInt(e.target.id);
    }
    //리스트를 갱신
    getList();
  };

  async function getList() {
    //일정 가져오기, 일정 페이징
    await axios
      .post('http://localhost:8000/schedule/count', {
        id: login_id,
      })
      .then((res) => {
        const { data } = res;
        //console.log(data);
        article_count = data[0].COUNT;
        page_count = Math.ceil(article_count / page_size);
        var page_activate = [];
        var page_li = [];
        //여기까지 수업시간에 진행한 페이징과 동일
        for (let i = 1; i <= page_count; i++) {
          page_li.push(i); //총 페이지 리스트 배열에 페이지 번호 삽입
          if (i === page_num) {
            //현재 페이지 번호 컨테이너에 색상 입히는 작업
            //page_activate[i] 가 true이면 className에 'activate' 를 추가하여 해당 태그에 추가 css 부여
            page_activate.push(true);
          } else page_activate.push(false);
        }
        setActive(page_activate);
        setPageArr(page_li);
      })
      .catch((e) => {
        console.error(e);
      });

    //페이징 처리한 일정 데이터를 추출. 이하는 역시 수업때 진행한 내용과 동일.
    await axios
      .post('http://localhost:8000/schedule/list', {
        page_num: page_num,
        page_size: page_size,
        article_count: article_count,
        id: login_id,
      })
      .then((res) => {
        const { data } = res;
        setScheduleList({ list: data });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <div className="bodywrap">
      <div className="pageTitle">
        <h1>내 일정 보관함</h1>
      </div>

      {/* 일정 리스트 */}
      <div className="scheduleList">
        <ScheduleList
          handlePage={handlePage} //페이지 핸들링 함수
          isActivate={isActivate} //페이지 이동 버튼의 css활성화/비활성화에 사용되는 state
          setActive={setActive} //페이지 이동 버튼의 css활성화/비활성화에 사용되는 state
          pageArr={pageArr} // 페이지 버튼 구현에 사용되는 페이지 배열 state
          handlelist={getList} //일정 리스트 추출 및 일정 페이징 처리 함수
          scheduleList={scheduleList} //추출된 일정 리스트
        />
      </div>
    </div>
  );
  //return;
}

export default Schedule;
