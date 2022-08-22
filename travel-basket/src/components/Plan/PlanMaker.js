import { useState, useRef } from 'react';
import DatePicker from 'react-datepicker'; //캘린더 라이브러리
import { ko } from 'date-fns/esm/locale'; //한국어 처리
import 'react-datepicker/dist/react-datepicker.css'; //캘린더 라이브러리(css)

import TypeContainer from './TypeContainer'; //여행타입 / 이동 수단 컨테이너
import PlanContainer from './PlanContainer'; //일차별 여행 계획 저장 컨테이너
import PlanMap from './PlanMap'; //지도 컨테이너
import AddPlan from './AddPlan';
import '../../css/plan.css';

/*
  남은 작업: 1.데이터 업로드, 2.지도, 3.지역 검색해서 날짜별 여행지에 저장
  기억해야하는 특이사항 :
    지역 검색하여 저장할때 여행별 카테고리(장소, 먹거리 등), 저장할 이름, 메모를 적도록 되어있음
    ㄴ> 테이블 수정이 필수불가결
    검색할때 장바구니에 담긴 내용이 있으면 그걸 먼저 띄워야함 
    ㄴ> 장바구니 테이블 추가 필수불가결(현재 장바구니 테이블 없음)
    지도는 일차에서 지역을 픽하면 일차별로 마커 색구분을 해서 지도에 마커를 찍는 정도로 하자.
    ㄴ> 지도는 카카오 api 검색은 네이버 지역 검색 api를  활용
    ㄴ> 지도를 캡쳐할수있는지가 중요. 화면캡쳐? html2canvas 라이브러리 활용하면 가능할듯?
    ㄴ> 일정 저장할때 html2canvas 로 캡쳐한 이미지가 로컬에 남지 않는게 베스트지만 남는다면 제거
*/

var selectedDays = 0; //검색하고자 하는 일자(배열 탐색에 쓰이므로 0부터 시작)

const PlanMaker = () => {
  const title = ''; //제목
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
    '울릉도/독도',
  ]; //지역

  const transport = ['도보', '자전거', '오토바이', '대중교통', '자동차']; //교통수단
  const trip_type = ['나혼자', '친구', '연인', '가족', '반려동물']; //여행타입
  const is_share = false; //공개 여부
  const plan_or_trans = ['타입', '교통'];
  const calRef = useRef();
  const searchRef = useRef();

  const [dayList, setDayList] = useState([
    {
      day: '1일차', //n일차
      plan: [
        {
          category: '',
          title: '',
          memo: '',
          place: '',
        },
      ],
    },
  ]); //일정(n박 m일)
  const [daytxt, setDayText] = useState('일정을 선택하세요'); //일정(몇월 몇일부터 몇월 몇일 몇박 몇일을 표기해주는 state)
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

  const [startDate, setStartDate] = useState(new Date()); //캘린더에서 여행 시작 날짜를 저장
  const [endDate, setEndDate] = useState(null); //캘린더에서 마지막 여행날짜를 저장
  const [month, setMonth] = useState(new Date().getMonth()); //이번 달이 몇월인지를 저장(이번달 외의 날짜는 글씨 회색 처리)

  const onCalChange = (dates) => {
    //달력 변경 이벤트시 처리되는 함수
    //여행 시작 날짜와 끝 날짜를 처리
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const upload = (e) => {
    //계획한 일정을 디비에 업로드(추후 개발)
    e.preventDefault();
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
      setPlan({
        plan: valArr,
        selected: selectedArr,
      });
    } else {
      setTrans({
        trans: valArr,
        selected: selectedArr,
      });
    }
  };

  const selectDate = (e) => {
    //날짜를 선택하여 선택 버튼을 누르면 실행되는 함수.
    var totalDayStr =
      startDate.toLocaleDateString() + ' ~ ' + endDate.toLocaleDateString();
    // yyyy. MM. dd ~ yyyy. MM. dd

    var btms = endDate.getTime() - startDate.getTime(); //마지막날과 첫날과의 시간차를 계산
    var nSleep = btms / (1000 * 60 * 60 * 24); //n박
    var nFullDay = nSleep + 1; //n일
    totalDayStr += `  (${nSleep}박 ${nFullDay}일)`;
    setDayText(totalDayStr);

    var daysArr = []; //일정 검색 및 추가 컨테이너를 활성화하기 위한 배열

    for (let i = 0; i < nFullDay; i++) {
      var planperdays = {
        day: `${i + 1}일차`,
        plan: [
          {
            category: '',
            title: '',
            memo: '',
            place: '',
          },
        ],
      };
      //배열에 `n일차` 텍스트를 삽입-> 컨테이너에서 받아서 표기
      daysArr.push(planperdays);
    }
    setDayList(daysArr); //state에 반영
    handleCalendar(e); //캘린더 visibility on/off
  };
  const cancelDate = (e) => {
    //캘린더 취소 버튼을 누르면 아무것도 하지 않고 캘린더 팝업을 닫는다.
    console.log(startDate, endDate);
    handleCalendar(e);
  };

  const handleCalendar = (e) => {
    //캘린더 visibility on/off
    var calArr = calRef.current.className.split(' '); //캘린더 컨테이너의 클래스명 배열
    var newCalClassname = 'calWraper '; //캘린더가 숨겨져있다면 그대로 이 텍스트가 클래스명이 됨.
    if (calArr[1] !== 'hidden') {
      //클래스명에 hidden이 포함되어있는지 아닌지 체크해서 추가
      newCalClassname += 'hidden';
    }
    calRef.current.className = newCalClassname; //클래스명을 재설정
    e.preventDefault();
  };
  const handleMonthChange = (date) => {
    //현재 몇월인지를 세팅(캘린더에서 이번달 이외의 날짜 글씨색 처리를 하기 위함)
    setMonth(date.getMonth());
  };
  const handleSearchPopup = (daycnt) => {
    //data:일차별 일정, daycnt:n일차의 n
    var searchClassArr = searchRef.current.className.split(' '); // 컨테이너의 클래스명 배열
    var newSearchClassname = 'searchWrap '; //숨겨져있다면 그대로 이 텍스트가 클래스명이 됨.
    if (searchClassArr[1] !== 'open') {
      //클래스명에 open이 포함되어있는지 아닌지 체크해서 추가
      newSearchClassname += 'open';
    }
    searchRef.current.className = newSearchClassname; //클래스명을 재설정
    selectedDays = daycnt; //현재 검색하기 위해 선택된 일자는 selectedDays
  };
  const savePlace = (data) => {};
  return (
    <div className="planerWrap container_center">
      <div className="searchWrap " ref={searchRef}>
        <AddPlan
          selectedDays={selectedDays}
          closeSerchPopup={handleSearchPopup}
          savePlace={savePlace}
        />
      </div>
      <div className="calWraper hidden" ref={calRef}>
        {/* 캘린더 컨테이너 */}
        <DatePicker
          dateFormat="yyyy년 MM월 dd일"
          selected={startDate}
          onChange={onCalChange}
          locale={ko}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          onMonthChange={handleMonthChange}
          dayClassName={(d) =>
            d.getDate() === startDate.getDate()
              ? 'custom-day selected-day'
              : d.getMonth() === month
              ? 'custom-day'
              : 'custom-day gray-day'
          }
        />
        <div className="calBtnWrap">
          <button className="calBtn" onClick={selectDate}>
            선택
          </button>
          <button className="calBtn" onClick={cancelDate}>
            취소
          </button>
        </div>
      </div>

      <div className="pageTitle">일정 만들기</div>
      <div className="updownSpace"></div>
      <form>
        <table className="selectTable">
          <tbody>
            <tr>
              <td className="t_label">제목</td>
              <td className="t_component">
                <input type="text" id="title" />
              </td>
            </tr>
            <tr>
              <td className="t_label">지역</td>
              <td className="t_component">
                <select id="area">
                  {area.map((_area, idx) => (
                    <option key={idx} value={_area}>
                      {_area}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td className="t_label">일정</td>
              <td className="t_component">
                <div className="planWrap" onClick={handleCalendar}>
                  <div className="labelDiv">
                    <label id="planLabel" className="dayText">
                      {daytxt}
                    </label>
                  </div>
                  <div className="buttonDiv">
                    <button id="calendar">+</button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="t_label">타입</td>
              <td className="t_component">
                {trip_type.map((val, idx) => (
                  <TypeContainer
                    key={idx}
                    type={plan_or_trans[0]}
                    val={val}
                    idx={idx}
                    selected={planArr.selected[idx]}
                    handleType={handleType}
                  />
                ))}
              </td>
            </tr>
            <tr>
              <td className="t_label">교통</td>
              <td className="t_component">
                {transport.map((val, idx) => (
                  <TypeContainer
                    key={idx}
                    type={plan_or_trans[1]}
                    val={val}
                    idx={idx}
                    selected={transArr.selected[idx]}
                    handleType={handleType}
                  />
                ))}
              </td>
            </tr>
            <tr>
              <td className="t_label">공유</td>
              <td className="t_component">
                <input type="radio" id="O" name="share" value="O" />
                <label htmlFor="O">공개</label>
                &nbsp;&nbsp;&nbsp;
                <input type="radio" id="X" name="share" value="X" />
                <label htmlFor="X">비공개</label>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="updownSpace"></div>
        <div className="map center_con">
          <PlanMap></PlanMap>
        </div>

        <div className="updownSpace"></div>
        <div className="planByDaysWrap center_con">
          {dayList.map((val, idx) => (
            <PlanContainer
              key={idx}
              daycnt={idx + 1}
              data={val}
              openSearchPopup={handleSearchPopup}
            />
          ))}
        </div>
        <div className="updownSpace"></div>
        <div className="btnWrap center_con">
          {/* <button type="submit" onClick={upload}> */}
          <button onClick={upload}>등록</button>
          <button type="reset">취소</button>
        </div>
        <div className="updownSpace"></div>
      </form>
    </div>
  );
};
export default PlanMaker;
