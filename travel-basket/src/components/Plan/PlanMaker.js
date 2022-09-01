import { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker'; //캘린더 라이브러리
import { ko } from 'date-fns/esm/locale'; //한국어 처리
import 'react-datepicker/dist/react-datepicker.css'; //캘린더 라이브러리(css)
import { useLocation } from 'react-router-dom';
import TypeContainer from './container/TypeContainer'; //여행타입 / 이동 수단 컨테이너
import PlanContainer from './container/PlanContainer'; //일차별 여행 계획 저장 컨테이너
import PlanMap from './container/PlanMap'; //지도 컨테이너
import AddPlan from './AddPlan'; //일정 추가 컨테이너
// <<<<<<< HEAD
// import './css/plan.css';
// =======
// import './css/plan.css';
import '../Plan/plan_css/planMaker.scss';

//>>>>>>> main
//import NaverPlanMap from './NaverPlanMap';
import AddMemo from './AddMemo';
import * as utill from '../../Utils/Utils';

/*
  남은 작업: 1.데이터 업로드, 2.지도, 3.지역 검색해서 날짜별 여행지에 저장
  기억해야하는 특이사항 :
    검색할때 장바구니에 담긴 내용이 있으면 그걸 먼저 띄워야함 
    ㄴ> 장바구니 테이블 추가 필수불가결(현재 장바구니 테이블 없음)
    지도는 일차에서 지역을 픽하면 일차별로 마커 색구분을 해서 지도에 마커를 찍는 정도로 하자.
    ㄴ> 지도는 카카오 api 검색은 카카오 지역 검색 api를  활용
    ㄴ> 지도를 캡쳐할수있는지가 중요. 화면캡쳐? html2canvas 라이브러리 활용하면 가능할듯?
    ㄴ> 일정 저장할때 html2canvas 로 캡쳐한 이미지가 로컬에 남지 않는게 베스트지만 남는다면 제거
*/

var selectedDays = 0; //검색하고자 하는 일자(배열 탐색에 쓰이므로 0부터 시작)
var pointsArr = []; //실제로 저장될 맵 가운데 정렬용 좌표 리스트
//const maikingState = ["normal", "making"];
var isMaking = false; //제작중 여부
var selectedAreaBefore = 0; //기본으로는 선택된 지역(서울)
var initPoint = utill.cityPoints[0]; //초기화용 좌표 세팅값(초기값은 서울)
var isUpdatedCal = false;
var isUpdatedCal2 = false;

const PlanMaker = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.state !== null) {
      //console.log(location.state);
      const schedule = location.state.data.schedule;
      const dList = location.state.data.dayList;
      //console.log(schedule, point, dList);

      titleRef.current.value = schedule.SCHEDULE_TITLE; //제목
      cityRef.current.value = parseInt(schedule.SCHEDULE_PLACE); //장소
      setDayText(schedule.SCHEDULE_PLAN); //일정(몇박 몇일)

      setStartDate(new Date(Date.parse(schedule.SCHEDULE_DAY[0])));
      setEndDate(
        new Date(
          Date.parse(schedule.SCHEDULE_DAY[schedule.SCHEDULE_DAY.length - 1]),
        ),
      );

      setOX(schedule.SCHEDULE_OX);
      var type_arr = [false, false, false, false, false];
      var trans_arr = [false, false, false, false, false];
      for (let i = 0; i < schedule.SCHEDULE_TOGETHER.length; i++) {
        type_arr[trip_type.indexOf(schedule.SCHEDULE_TOGETHER[i])] = true;
      }
      for (let i = 0; i < schedule.SCHEDULE_VEHICLE.length; i++) {
        trans_arr[transport.indexOf(schedule.SCHEDULE_VEHICLE[i])] = true;
      }
      setPlan({ plan: schedule.SCHEDULE_TOGETHER, selected: type_arr });
      setTrans({ trans: schedule.SCHEDULE_VEHICLE, selected: trans_arr });
      setDayList(dList);
      //initPoint = utill.getMapsLatLng(point[0].La, point[0].Ma);

      pointsArr = []; //전역변수
      const point = location.state.data.points;
      for (let i = 0; i < point.length; i++) {
        var p = utill.getMapsLatLng(point[i].Ma, point[i].La);
        pointsArr.push(p);
      }
      setPoints(pointsArr);
    }
  }, []);
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
    '울릉도,독도',
  ]; //지역

  const transport = ['도보', '자전거', '오토바이', '대중교통', '자동차']; //교통수단
  const trip_type = ['나혼자', '친구', '연인', '가족', '반려동물']; //여행타입
  const is_share = false; //공개 여부
  const plan_or_trans = ['타입', '교통'];

  const calRef = useRef(); //캘린더 랩 ref
  const searchRef = useRef(); //검색창 ref
  const memoPopupRef = useRef(); //메모창 ref
  const searchConRef = useRef({}); //검색창 컨테이너 ref
  const cityRef = useRef(); //도시 선택 ref
  const titleRef = useRef(); //제목 ref
  const [isopen, setOX] = useState('O'); //공유 여부 체크
  const setRadioValue = (e) => {
    setOX(e.target.value);
  };

  const [searchCtrl, setSearchCtrl] = useState(true); //검색결과 태그 컨트롤
  const [selectedItem, selectItem] = useState({}); //메모를 남길 아이템

  const [points, setPoints] = useState([initPoint]); //맵 중앙정렬을 위해 저장되는 좌표 리스트

  const [dayList, setDayList] = useState([
    {
      noEditted: true,
      day: '1일차', //n일차
      area: [], //저장한 가고싶은 장소 객체배열
      memo: [], //여기가 메모부
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
  const [isUpdatingMemo, setUpdateMemoMode] = useState(false); //메모 수정 여부 체크, 기본값은 false
  const [updateMemoData, setUpdateMemoData] = useState({}); //수정하고자 하는 메모 데이터

  const init = () => {
    //총합 정보 초기화 기능
    //제작중 여부 초기화
    isMaking = false;
    //제목 초기화
    titleRef.current.value = '';
    //지역 초기화
    selectedAreaBefore = 0;
    cityRef.current.value = selectedAreaBefore;
    //날짜초기화는 일단 스킵
    setStartDate(new Date());
    setEndDate(null);
    setDayText('일정을 선택하세요');

    //여행타입 초기화
    setPlan({
      plan: [],
      selected: [false, false, false, false, false],
    });
    //이동수단 초기화
    setTrans({
      //선택된 이동수단을 저장하는 객체(selected는 선택 버튼의 활성화/비활성화를 담당)
      trans: [],
      selected: [false, false, false, false, false],
    });
    //공개여부는 기본적으로 O
    setOX('O');

    //저장정보
    setDayList([utill.emptyPlan()]);
  };
  const reset = () => {
    //초기화
    init();
    //const citypoints = utill.cityPoints[cityRef.current.value];
    setPoints([initPoint]);
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

    if (location.state !== null) {
      //220830 선우 수정중에 날짜 변경하면 나타나는 알림창
      isUpdatedCal = true;
      alert('날짜는 수정하실 수 없습니다!!');
      return;
    }

    if (daytxt !== '일정을 선택하세요') {
      if (
        !window.confirm(
          '날짜를 새로 선택하면 기존에 저장된 일정은 사라집니다. 그래도 계속하시겠습니까?',
        )
      ) {
        return;
      }
    }

    var totalDayStr =
      startDate.toLocaleDateString() + ' ~ ' + endDate.toLocaleDateString();
    // yyyy. MM. dd ~ yyyy. MM. dd

    var btms = endDate.getTime() - startDate.getTime(); //마지막날과 첫날과의 시간차를 계산
    var nSleep = Math.ceil(btms / (1000 * 60 * 60 * 24)); //n박(소수로 계산되면 반올림처리)
    var nFullDay = nSleep + 1; //n일
    totalDayStr += `  (${nSleep}박 ${nFullDay}일)`;
    setDayText(totalDayStr);

    var daysArr = []; //일정 검색 및 추가 컨테이너를 활성화하기 위한 배열

    for (let i = 0; i < nFullDay; i++) {
      var txt = `${i + 1}일차`;
      var planperdays = utill.emptyPlan();
      planperdays.day = txt;
      // var planperdays = {
      //   noEditted: true,
      //   day: `${i + 1}일차`,
      //   area: [], //저장한 가고싶은 장소 객체배열
      //   memo: [],
      // };
      //배열에 `n일차` 텍스트를 삽입-> 컨테이너에서 받아서 표기
      //추가로 여기서 객체 틀을 생성해줘서 추후에 데이터 업로드때 활횽
      daysArr.push(planperdays);
    }
    isMaking = false; //날짜를 재설정하면 일정 제작 여부도 초기화

    if (location.state !== null && isUpdatedCal2 === false) {
      //지역 초기화
      //제목 초기화
      titleRef.current.value = '';
      //지역 초기화
      selectedAreaBefore = 0;
      cityRef.current.value = selectedAreaBefore;

      //여행타입 초기화
      setPlan({
        plan: [],
        selected: [false, false, false, false, false],
      });
      //이동수단 초기화
      setTrans({
        //선택된 이동수단을 저장하는 객체(selected는 선택 버튼의 활성화/비활성화를 담당)
        trans: [],
        selected: [false, false, false, false, false],
      });
      //공개여부는 기본적으로 O
      setOX('O');
      setPoints([initPoint]); //날짜가 선택되거나 기간을 재선택하면 저장된 좌표를 초기화
      pointsArr = []; //날짜가 선택되거나 기간을 재선택하면 저장된 좌표초기화2
      isUpdatedCal2 = true;
    }

    setDayList(daysArr); //일정 갯수를 state에 반영
    handleCalendar(e); //캘린더 visibility on/off
  };
  const cancelDate = (e) => {
    //캘린더 취소 버튼을 누르면 아무것도 하지 않고 캘린더 팝업을 닫는다.
    handleCalendar(e);
  };

  const handleCalendar = (e) => {
    //캘린더 visibility on/off
    // var calArr = calRef.current.className.split(' '); //캘린더 컨테이너의 클래스명 배열
    // var newCalClassname = 'calWraper '; //캘린더가 숨겨져있다면 그대로 이 텍스트가 클래스명이 됨.
    // if (calArr[1] !== 'hidden') {
    //   //클래스명에 hidden이 포함되어있는지 아닌지 체크해서 추가
    //   newCalClassname += 'hidden';
    // }
    // calRef.current.className = newCalClassname; //클래스명을 재설정
    controllClassName(calRef, 'calWraper', 'hidden'); //여기서 팝업창의 열고 닫기를 활성화
    e.preventDefault();
  };
  const handleMonthChange = (date) => {
    //현재 몇월인지를 세팅(캘린더에서 이번달 이외의 날짜 글씨색 처리를 하기 위함)
    setMonth(date.getMonth());
  };
  const handlePopup = (daycnt) => {
    //검색창 팝업 컨트롤 함수

    controllClassName(searchRef, 'searchWrap', 'open'); //검색창 열고 닫기

    if (memoPopupRef.current.className.split(' ')[1] !== 'displayNone') {
      //메모장을 킨 상태에서 뒤로가기 버튼을 누르고 다시 검색창을 열면 메모장을 닫기
      controllClassName(memoPopupRef, 'addMemoWrap', 'displayNone');
    }
    selectedDays = daycnt; //현재 검색하기 위해 선택된 일자는 selectedDays
  };
  const controllClassName = (ref, baseClassText, addClassName) => {
    var baseClassArr = ref.current.className.split(' '); // 컨테이너의 클래스명 배열
    var newClassname = baseClassText + ' '; //숨겨져있다면 그대로 이 텍스트가 클래스명이 됨.
    if (baseClassArr[1] !== addClassName) {
      //클래스명에 open이 포함되어있는지 아닌지 체크해서 추가
      newClassname += addClassName;
    }
    ref.current.className = newClassname; //클래스명을 재설정
  };
  const setMemoData = (data) => {
    //일차별 계획 저장
    //console.log('selectedDays, data : ', selectedDays, data);
    //daynostr : n일차(문자열), idx: n일차의 n-1, data : dayList.plan

    //1. css (숨겨놨던 메모 팝업을 띄운다)
    controllClassName(memoPopupRef, 'addMemoWrap', 'displayNone');
    //2. 메모장에 데이터를 전달한다.
    selectItem(data);

    //var nowlist = dayList[idx].plan.push(data);
    //현재 n일차의 저장된 리스트를 새로운 배열로 재생성해서 푸시 한 후에 그대로 반영
    // setDayList(
    //   dayList.map((val) =>
    //     val.day === daynostr ? { ...val, plan: nowlist } : val,
    //   ),
    // );
    // console.log(nowlist);
  };
  const deletePlace = (idx, daycnt) => {
    //n일차의 n번째 저장 정보를 제거
    //n일차의 몇번째 인덱스인지만 받아오면 됨
    var arr = [];
    console.log('idx, daycnt', idx, daycnt);
    for (let i = 0; i < dayList.length; i++) {
      var data = dayList[i];
      if (data.day === daycnt + '일차') {
        if (location.state !== null) {
          //수정중일경우 삭제할 아이템인거만 표기한다.
          data.memo[idx].isDeleting = true;
        } else {
          data.area.splice(idx, 1); //여기서 idx번째 인덱스부터 1개의 객체를 세어서 제거한다.
          data.memo.splice(idx, 1);
        }
      }
      arr.push(data);
    }
    //console.log(arr);
    setDayList(arr);
  };
  const handleMemoPopup = (mode, updateData) => {
    //메모장 팝업 처리
    // if (mode === 'open') {
    // } else
    //console.log('수정중인가요 : ', isUpdatingMemo, mode);
    // if (isUpdatingMemo === true) {
    //   //메모장 수정모드가 켜지면 메모장만 켜고 반환한다.
    //   controllClassName(memoPopupRef, 'addMemoWrap', 'displayNone'); //메모창 열고 닫기
    //   return;
    // }
    if (mode === 'save') {
      //메모 저장하면 메모장이랑 검색창 모두 닫기
      searchConRef.current.init();
      //init();
      controllClassName(searchRef, 'searchWrap', 'open'); //검색창 열고 닫기
      controllClassName(memoPopupRef, 'addMemoWrap', 'displayNone'); //메모창 열고 닫기
      setSearchCtrl(true); //검색창 숨김을 해제
      alert('저장완료!');
    } else if (mode === 'update') {
      controllClassName(memoPopupRef, 'addMemoWrap', 'displayNone'); //메모창 열고 닫기
    } else if (mode === 'updateComplete') {
      var arr = [];
      //updateData.item;//이거도 그냥 비교용
      //updateData.memo;
      for (let i = 0; i < dayList.length; i++) {
        var data = dayList[i];
        for (let j = 0; j < data.area.length; j++) {
          var area = data.area[j];

          if (
            data.day === selectedDays + '일차' &&
            area.place_name === updateData.item.place_name
          ) {
            updateData.memo.plan_idx = data.memo[j].plan_idx;
            data.memo[j] = updateData.memo; //메모를 수정
          }
          //   console.log(data.area);
          // }
        }
        arr.push(data);
      }
      setDayList(arr); //갱신된 데이터 저장
      controllClassName(memoPopupRef, 'addMemoWrap', 'displayNone'); //메모창 열고 닫기
      setUpdateMemoMode(false); //수정이 끝나면 수정모드를 해제
    } else {
      //mode===close
      closeMemo();
    }
  };
  const makePlanPerDay = (memoData, placeData) => {
    //여기서 일차별 장소 리스트와 각각 장소별 메모를 저장.
    // 장소리스트와 메모 리스트가 분리되어있기 때문에 이 둘은 항상 같은 인덱스로 관리해야함.
    //더 좋은 방법 고민해봐야할듯
    isMaking = true; //일정 제작이 시작되면 상태 변경
    var now = selectedDays + '일차'; //지금 저장하려고 하는 데이터가 몇일차인지 확인하게해줌
    var setArr = []; //데이터 세팅을 위한 공백 배열
    //console.log(placeData, memoData);
    for (let i = 0; i < dayList.length; i++) {
      //날짜를 선택할때 같이 생성되는 객체 배열의 길이만큼 반복
      //이때 객체 배열의 길이는 최종 여행 일자와 같음
      var base = utill.emptyPlan(); // 빈 객체
      base.noEditted = false;
      base.day = i + 1 + '일차'; //객체에 저장할 n일차
      //console.log(dayList[i].day, now);
      if (dayList[i].day === now) {
        //현재 일차라면 저장된 리스트를 불러와서 거기에 신규 데이터를 합친다.
        var isdeletedData = false; //삭제된 아이템을 새로 추가했는지 여부를 확인
        if (location.state !== null) {
          //데이터 수정중에 삭제한 정보를 새로 넣으려고 할 경우
          for (let j = 0; j < dayList[i].area.length; j++) {
            if (placeData.place_name === dayList[i].area[j].place_name) {
              //삭제한 후에 같은 곳을 다시 추가했다면 메모랑 카테고리만 초기화하고 isdeleting을 false로 변경
              console.log(dayList[i].memo[j].plan_idx);
              isdeletedData = true;
              dayList[i].memo[j].isDeleting = false;
              //dayList[i].memo[j].plan_idx = memoData.plan_idx;
              dayList[i].memo[j].category = memoData.category;
              dayList[i].memo[j].memo = memoData.memo;
              dayList[i].memo[j].title = memoData.title;
            }
          }
        }
        if (isdeletedData) {
          console.log(dayList);
          return;
        }
        //수정중일경우 삭제할 아이템인거만 표기한다.
        base.area = [...dayList[i].area, placeData];

        memoData.plan_idx = -1; //일정 수정시 새로 추가되는 일정 체크용
        base.memo = [...dayList[i].memo, memoData];
        //신규 데이터가 들어올때 좌표도 같이 추가
      } else {
        //그 외에는 리스트 유지.
        base.area = dayList[i].area;
        base.memo = dayList[i].memo;
      }

      setArr.push(base);
    }
    //console.log('!!!!!!!!!!!!!!!!!', pointsArr);
    //console.log(setArr);
    const lat = parseFloat(placeData.y);
    const lng = parseFloat(placeData.x);
    if (
      pointsArr.length === 1 &&
      utill.cityPoints.indexOf(utill.getMapsLatLng(lat, lng)) !== -1
    )
      pointsArr = [utill.getMapsLatLng(lat, lng)];
    else pointsArr.push(utill.getMapsLatLng(lat, lng));
    //console.log('!!!!!!!!!!!!!!!!!', pointsArr);
    setPoints(pointsArr); //좌표 배열을 누적된대로 재배치
    //console.log(points);
    setDayList(setArr);
  };
  const closeMemo = () => {
    //메모장 닫기
    //1.메모장을 닫는다.
    controllClassName(memoPopupRef, 'addMemoWrap', 'displayNone');
    setUpdateMemoMode(false); //메모를 닫으면 어떤 상태였던 수정 모드를 종료한다.

    //2. 숨겨놨던 검색결과(장바구니)를 연다
    setSearchCtrl(true);
  };
  const changeCity = (e) => {
    //자역 선택이 바뀌면 지도 위치재설정
    const selectedArea = parseInt(cityRef.current.value); //지금 선택한 지역
    //selectedAreaBefore
    //console.log(isMaking, selectedArea, selectedAreaBefore);
    if (isMaking && selectedArea !== selectedAreaBefore) {
      //일정 제작중이고 지역이 재선택되었으면 초기화
      if (
        window.confirm(
          '일정을 만드는중에 지역을 이동하면 저장한 정보가 초기화됩니다. 그래도 괜찮으세요?',
        )
      ) {
        init();
      } else {
        cityRef.current.value = selectedAreaBefore;
        return;
      }
    }
    //여기서 위치 조정 세팅 재설정(init에서 위치 건들필요 없음)

    const citypoints = utill.cityPoints[cityRef.current.value];
    pointsArr = [];
    //var arr = [];
    pointsArr.push(citypoints);
    //console.log(arr);
    setPoints(pointsArr);
    selectedAreaBefore = selectedArea; //선택중인 지역을 수정
  };

  const getUpdateMemoData = (data, idx, daycnt) => {
    //수정할 메모 데이터를 세팅.
    selectItem(data.area[idx]);
    setUpdateMemoData(data.memo[idx]);
    setUpdateMemoMode(true);
    selectedDays = daycnt; //선택한 수정할 메모의 일차
    //이게 메모가 적힐 장소 데이터
  };

  const uploadPlan = (e) => {
    //여기서 일정 디비에 업로드

    //console.log(titleRef.current.value, daytxt);
    if (titleRef.current.value === '') {
      alert('제목을 입력해주세요!');
      return;
    }
    if (daytxt === '일정을 선택하세요') {
      alert('일정을 만들어주세요!');
      return;
    }

    for (let i = 0; i < dayList.length; i++) {
      const data = dayList[i].area;
      if (data.length === 0) {
        alert('일정이 입력되어있지 않습니다! 일차별 일정을 각각 입력해주세요!');
        return;
      }
    }
    console.log(startDate, endDate);
    console.log(utill.getDatesStartToLast(startDate, endDate));
    var dayarr = utill.getDatesStartToLast(startDate, endDate).join(',');

    const mergedData = {
      schedule_idx: location.state !== null ? location.state.schedule_idx : -1,
      title: titleRef.current.value, //제목
      selectedArea: cityRef.current.value, //장소
      day: daytxt, //일정(몇박 몇일)
      plan: planArr.plan, //여행타입
      totalday: dayarr, //n일부터 m일까지 ,로 연결한 문자열
      trans: transArr.trans, //이동수단
      uploadIsopen: isopen, //공개여부
      useridx: window.sessionStorage.getItem('USER_IDX'), //회원번호
      finalPlan: dayList,
    };
    console.log(mergedData);

    if (location.state !== null) {
      //수정
      utill.updatePlan2DB(mergedData);
    } else {
      //신규등록
      utill.uploadPlan2DB(mergedData);
    }
    window.location.href = './schedule';
    e.preventDefault();
  };
  return (
    <div className="planerWrap">
      <div className="searchWrap " ref={searchRef}>
        {/* 검색창 컨테이너 */}
        <AddPlan
          ref={searchConRef}
          selectedDays={selectedDays} //선택한 n일차
          closeSerchPopup={handlePopup} //여기서 팝업창 여닫기 컨트롤
          setMemoData={setMemoData} //데이터 저장 함수
          controllClassName={controllClassName} //검색창 내부에서 메모창 팝업 컨트롤하기위해 보내주는 함수
          isSearching={searchCtrl} //현재 검색중인지 메모장을 켰는지를 체크
          setMode={setSearchCtrl} //검색/메모장 모드 세트
        />
      </div>
      <div ref={memoPopupRef} className="addMemoWrap displayNone">
        {/* 메모장 
        
        */}
        <AddMemo
          handleMemoPopup={handleMemoPopup} //메모장 팝업 컨트롤
          selectedItem={selectedItem} //메모할 아이템 / 메모를 수정할 아이템을 선택
          makePlan={makePlanPerDay} //일정별 장소와 메모 저장
          isUpdating={isUpdatingMemo} // 메모를 수정중인지 여부
          updatingData={isUpdatingMemo ? updateMemoData : ''} //메모 수정중이면 수정하려는 메모 데이터, 아니면 ""
        />
      </div>

      <div className="calWraper hidden" ref={calRef}>
        {/* 캘린더 컨테이너 */}
        <DatePicker
          dateFormat="yyyy년 MM월 dd일" //날짜 포맷
          onChange={onCalChange} //내부에서 데이터 변경시 setState
          locale={ko} //달력 국가 설정
          startDate={startDate} // 선택한 첫 날짜(날짜 범위지정에 쓰임)
          endDate={endDate} //선택한 마지막 날짜(날짜 범위지정에 쓰임)
          selectsRange //범위지정 속성
          inline
          onMonthChange={handleMonthChange} //달 옮길때 이벤트 처리
          dayClassName={(
            //이번달이 아닌 날은 글씨 색을 회색 처리
            d,
          ) =>
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

      <div className="pageTitle">
        <h1>일정 만들기</h1>
      </div>
      <div>
        <table className="selectTable">
          <tbody>
            <tr>
              <td className="t_label">제목</td>
              <td className="t_component">
                <input
                  ref={titleRef}
                  type="text"
                  id="title"
                  placeholder="예_2박 3일 제주도"
                />
              </td>
            </tr>
            <tr>
              <td className="t_label">지역</td>
              <td className="t_component">
                <select id="area" ref={cityRef} onChange={changeCity}>
                  {area.map((_area, idx) => (
                    <option key={idx} value={idx}>
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
                    {/* <button id="calendar">+</button> */}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="t_label">타입</td>
              <td className="t_component">
                {/* 여행 타입 컨테이너 */}
                {trip_type.map((val, idx) => (
                  <TypeContainer
                    key={idx}
                    type={plan_or_trans[0]} //여행 타입인지 이동수단인지를 전달(여행타입과 이동수단이 같은 컨테이너를 사용)
                    val={val} //여행타입
                    idx={idx} //선택시 데이터 처리를 위한 인덱스
                    selected={planArr.selected[idx]} //선택시 css 처리를 위한 속성
                    handleType={handleType} //버튼 클릭시 발생하는 이벤트
                    isMaking={true}
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
                    type={plan_or_trans[1]} //여행 타입인지 이동수단인지를 전달(여행타입과 이동수단이 같은 컨테이너를 사용)
                    val={val} //이동수단
                    idx={idx} //선택시 데이터 처리를 위한 인덱스
                    selected={transArr.selected[idx]} //선택시 css 처리를 위한 속성
                    handleType={handleType} //버튼 클릭시 발생하는 이벤트
                    isMaking={true}
                  />
                ))}
              </td>
            </tr>
            <tr>
              <td className="t_label">공유</td>
              <td className="t_component">
                <input
                  type="radio"
                  id="O"
                  name="share"
                  value="O"
                  checked={isopen === 'O'}
                  onChange={setRadioValue}
                />
                <label htmlFor="O">&nbsp; 공개</label>
                &nbsp;&nbsp;&nbsp;
                <input
                  type="radio"
                  id="X"
                  name="share"
                  value="X"
                  checked={isopen === 'X'}
                  onChange={setRadioValue}
                />
                <label htmlFor="X">&nbsp; 비공개</label>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="map center_con">
          {/* 카카오 지도 */}
          <PlanMap markerlist={dayList} pointsList={points}></PlanMap>
          {/* <NaverPlanMap></NaverPlanMap> */}
        </div>

        <div className="planByDaysWrap center_con">
          {/* 일정 목록 컨테이너(n박 n일에 맞춰서 생성됨) */}
          {dayList.map((val, idx) => (
            <PlanContainer
              key={idx}
              daycnt={idx + 1} //n박의 n
              data={val} //dayList[idx] => 저장할 n일차의 정보
              openSearchPopup={handlePopup} //팝업 컨트롤
              setUpdateMode={setUpdateMemoMode}
              openMemo={handleMemoPopup}
              setUpdateMemoItem={getUpdateMemoData}
              deletePlace={deletePlace}
            />
          ))}
        </div>
        <div className="btnWrap center_con">
          {/* <button type="submit" onClick={upload}> */}
          <button onClick={uploadPlan}>등록</button>
          <button type="reset" onClick={reset}>
            초기화
          </button>
        </div>
      </div>
    </div>
  );
};
export default PlanMaker;
