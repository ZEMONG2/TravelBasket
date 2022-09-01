import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleBoardArticle from './ScheduleBoardArticle';
import TypeButtnContainer from './TypeButtonContainer';
import axios from 'axios';
// import './ScheduleBoard.css';
import '../Header/header_css/Scheduleboard.scss';
var page_num = 1; //현재 보고있는 페이지
const page_size = 6; //한 페이지에 보여줄 데이터 갯수
var page_count = 1; //최종 페이지 갯수
var article_count = 0; //총 등록된 일정 갯수

const login_id = window.sessionStorage.getItem('USER_ID');
const Scheduleboard = () => {
  const [pageArr, setPageArr] = useState([]); //총 페이지 배열
  const [isActivate, setActive] = useState([]); //버튼의 active/unactive 여부를 저장하는 state
  const [scheduleList, setScheduleList] = useState({
    //페이징 처리된 일정 리스트의 객체
    list: [],
  });
  const [planArr, setPlan] = useState({
    //선택된 여행 타입을 저장하는 객체(selected는 선택 버튼의 활성화/비활성화를 담당)
    plan: [],
    selected: [false, false, false, false, false],
  });
  const [transArr, setTrans] = useState({
    //선택된 이동수단을 저장하는 객체(selected는 선택 버튼의 활성화/비활성화를 담당)
    trans: [],
    selected: [false, false, false, false, false],
  });
  var plan4Search = [];
  var trans4Search = [];
  const transport = ['도보', '자전거', '오토바이', '대중교통', '자동차']; //교통수단
  const trip_type = ['나혼자', '친구', '연인', '가족', '반려동물']; //여행타입
  const plan_or_trans = ['타입', '교통'];
  const cityRef = useRef();
  const area = [
    '서울',
    '부산',
    '대구',
    '인천',
    '광주',
    '대전',
    '울산',
    '세종',
    '제주',
    '울릉도,독도',
  ]; //지역

  const handlePage = (e) => {
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
  useEffect(() => {
    getList();
  }, []);
  async function getList() {
    //일정 가져오기, 일정 페이징
    var plan = plan4Search.join('|');
    var trans = trans4Search.join('|');
    await axios
      .post('http://localhost:8000/schedule/boardcount', {
        schedule_place: cityRef.current.value,
        schedule_together: plan,
        schedule_vehicle: trans,
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
      .post('http://localhost:8000/schedule/boardlist', {
        page_num: page_num,
        page_size: page_size,
        article_count: article_count,
        schedule_place: cityRef.current.value,
        schedule_together: plan,
        schedule_vehicle: trans,
      })
      .then((res) => {
        const { data } = res;
        setScheduleList({ list: data });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  const movePage = (e) => {
    const tag_id = e.target.id; //클릭한 버튼의 태그 아이디

    if (tag_id === 'move2left' || tag_id === 'move2right') {
      //화살표 버튼 이벤트 처리
      handlePage(e);
    } else {
      //페이지 버튼 이벤트 처리
      const pageNo = parseInt(e.target.attributes.getNamedItem('page').value); //클릭한 버튼의 페이지 번호

      //1. 클릭한 버튼 css 변경
      let activeArr = [];
      for (let i = 0; i < isActivate.length; i++) {
        /*
          기본적으로는 false를 넣되 현재 페이지 번호 - 1(배열의 인덱스는 0부터 시작하므로) 에는 true를 넣음
        */
        activeArr[i] = false;
        if (i === pageNo - 1) activeArr[i] = true;
      }
      setActive(activeArr); //여기서 변경사항 반영후 렌더링

      //2. 페이지 이동
      handlePage(e);
    }
  };
  const PageButton = (props) => {
    const { page, type, ...other } = props; //전달받은 프로퍼티를 변수화하여 사용(사용되지 않는 프로퍼티는 other로 처리)
    return (
      <button
        className={'btn' + (type === undefined ? '' : ' ' + type)}
        page={page === undefined ? '' : page}
        {...other}
      />
    );
  };

  const handleType = (type, val, idx) => {
    //여행 타입 / 이동수단의 on/off와 on 된 데이터를 객체 저장

    var valArr = []; //실제 값(나혼자 , 연인, 자전거, 도보 등등)
    var selectedArr = []; //css처리를 위한 on / off 배열(true/false 로 저장)

    var insertValArr = []; //현재 저장된 타입/이동수단 등의 값을 유동적으로 받아올 배열 객체
    if (type === plan_or_trans[0]) {
      //여행 타입(누구와 여행을 가는지)
      selectedArr = planArr.selected;
      insertValArr = trip_type;
    } else {
      //이동수단
      selectedArr = transArr.selected;
      insertValArr = transport;
    }

    selectedArr[idx] = !selectedArr[idx]; //클릭한 버튼의 인덱스의 boolean 값을 반전시킴.-> true인 버튼을 활성화
    if (insertValArr.length === 0) {
      //만약에 선택한 값이 전혀 없다면 추가 작업 없이 배열에 넣는다.
      valArr.push(val);
    } else {
      //그렇지 않다면 selectedArr[idx]가 true인 카테고리[idx]를 데이터 반영할 배열에 넣는다.
      for (let i = 0; i < insertValArr.length; i++) {
        if (selectedArr[i] === true) {
          valArr.push(insertValArr[i]);
        }
      }
    }

    //state를 업데이트
    if (type === plan_or_trans[0]) {
      plan4Search = valArr;
      setPlan({
        plan: valArr,
        selected: selectedArr,
      });
    } else {
      trans4Search = valArr;
      setTrans({
        trans: valArr,
        selected: selectedArr,
      });
    }
    getList();
  };

  return (
    <>
      <div>
        <h1>일정 공유 게시판</h1>
        <div className="to">
          <p>지역 검색</p>
          {/* <input
            className="search"
            type="text"
            placeholder="지역을 입력하세요"
          ></input> */}
          <select id="searchArea" ref={cityRef} onChange={getList}>
            <option value={-1}>지역을 선택하세요</option>
            {area.map((_area, idx) => (
              <option key={idx} value={idx}>
                {_area}
              </option>
            ))}
          </select>
        </div>
        <div className="to">
          <p>동행 타입</p>
          <div className="companion">
            {trip_type.map((val, idx) => (
              <TypeButtnContainer
                key={idx}
                type={plan_or_trans[0]} //여행 타입인지 이동수단인지를 전달(여행타입과 이동수단이 같은 컨테이너를 사용)
                val={val} //여행타입
                idx={idx} //선택시 데이터 처리를 위한 인덱스
                selected={planArr.selected[idx]} //선택시 css 처리를 위한 속성
                handleType={handleType} //버튼 클릭시 발생하는 이벤트
              />
            ))}
          </div>
        </div>
        <div className="to">
          <p>교통 수단</p>
          <div className="transport">
            {transport.map((val, idx) => (
              <TypeButtnContainer
                key={idx}
                type={plan_or_trans[1]} //여행 타입인지 이동수단인지를 전달(여행타입과 이동수단이 같은 컨테이너를 사용)
                val={val} //여행타입
                idx={idx} //선택시 데이터 처리를 위한 인덱스
                selected={transArr.selected[idx]} //선택시 css 처리를 위한 속성
                handleType={handleType} //버튼 클릭시 발생하는 이벤트
              />
            ))}
          </div>
        </div>
      </div>
      <div className="schedulearticlebody">
        {scheduleList.list.length > 0 ? (
          scheduleList.list.map((schedule, idx) => (
            <ScheduleBoardArticle key={idx} idx={idx} data={schedule} />
          ))
        ) : (
          <div className="noListHere">등록된 일정이 없습니다</div>
        )}
      </div>

      <div className="scheduleListWrap">
        <button className="btn">&lt;&lt;</button>
        <PageButton type="mover" id="move2left" onClick={movePage}>
          &lt;
        </PageButton>
        {/* 페이지 버튼의 동적 구현*/}
        {pageArr.length > 0
          ? pageArr.map((page, idx) => (
              <PageButton
                type={isActivate[idx] === true ? 'activate' : ''}
                page={page}
                key={idx}
                id={idx + 1}
                onClick={movePage}
              >
                {page}
              </PageButton>
            ))
          : ''}
        <PageButton type="mover" id="move2right" onClick={movePage}>
          &gt;
        </PageButton>
        <button className="btn">&gt;&gt;</button>
      </div>
    </>
  );
};

export default Scheduleboard;
