import axios from 'axios';

export var common_url = 'http://localhost:8000';

export async function getDataAsPost(url, bodyData) {
  var data;
  //post로 서버통신
  await axios
    .post(url, bodyData)
    .then((res) => {
      ({ data } = res);
    })
    .catch((e) => {
      console.error(e);
    });
  return data;
}
export async function getDataAsGetWithNoParams(url) {
  var data;
  //일정 가져오기, 일정 페이징
  await axios
    .get(url)
    .then((res) => {
      ({ data } = res);
    })
    .catch((e) => {
      console.error(e);
    });
  return data;
}
export async function getDataAsGetWithParams(url, params) {
  var data;
  //일정 가져오기, 일정 페이징
  await axios
    .get(url, params)
    .then((res) => {
      ({ data } = res);
    })
    .catch((e) => {
      console.error(e);
    });
  return data;
}

export function getDatesStartToLast(startDay, endDay) {
  //두 날짜(문자열) 사이의 모든 일차를 배열로 반환

  var startDate = startDay.getFullYear() + '-';
  if (startDay.getMonth() < 10) {
    startDate += '0' + (startDay.getMonth() + 1);
  } else {
    startDate += startDay.getMonth() + 1;
  }
  if (startDay.getDate() < 10) {
    startDate += '-0' + startDay.getDate();
  } else {
    startDate += '-' + startDay.getDate();
  }

  var lastDate = endDay.getFullYear() + '-';
  if (endDay.getMonth() < 10) {
    lastDate += '0' + (endDay.getMonth() + 1);
  } else {
    lastDate += endDay.getMonth() + 1;
  }
  if (endDay.getDate() < 10) {
    lastDate += '-0' + endDay.getDate();
  } else {
    lastDate += '-' + endDay.getDate();
  }

  var regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
  if (!(regex.test(startDate) && regex.test(lastDate)))
    return 'Not Date Format';
  var result = [];
  var curDate = new Date(startDate);
  while (curDate <= new Date(lastDate)) {
    result.push(curDate.toISOString().split('T')[0]);
    curDate.setDate(curDate.getDate() + 1);
  }
  return result;
}
export function thumbnailSrc(idx) {
  return [
    '/img/서울_남산.jpg',
    '/img/부산_광안리.jpg',
    '/img/대구_디아크문화관.jpg',
    '/img/인천_송도.jpg',
    '/img/광주_무등산.jpg',
    '/img/대전_엑스포과학공원.jpg',
    '/img/울산_간절곶.jpg',
    '/img/세종_로고.jpg',
    '/img/제주_돌하르방.jpg',
    '/img/울릉도,독도.jpg',
  ];
}

function makeScheduleUploadData(data) {
  var schedule = {
    SCHEDULE_TITLE: data.title,
    SCHEDULE_PLAN: data.day,
    SCHEDULE_PLACE: parseInt(data.selectedArea),
    SCHEDULE_DAY: data.totalday,
    SCHEDULE_OX: data.uploadIsopen,
    USER_IDX: parseInt(data.useridx),
    SCHEDULE_VEHICLE: data.trans.join(','),
    SCHEDULE_TOGETHER: data.plan.join(','),
  };
  return schedule;
}
function makePlanUploadData(data) {
  var plan = [];
  //일차별로 객체를 하나씩 만들고
  //객체안에 정보를 하나씩 넣는다
  for (let i = 0; i < data.finalPlan.length; i++) {
    var planByDay = [];
    const area = data.finalPlan[i].area;
    const memo = data.finalPlan[i].memo;
    for (let j = 0; j < area.length; j++) {
      //저장한 지역갯수와 메모 갯수는 항상 일치하니 같이 반복문 돌린다.
      var planInfo = {
        //n일차별 플랜
        PLAN_DAYS: data.finalPlan[i].day,
        P_CATE_IDX: memo[j].category,
        PLAN_MEMO: memo[j].memo,
        PLAN_TITLE: memo[j].title,
        PLAN_LAT: area[j].y,
        PLAN_LNG: area[j].x,
        PLAN_LINK: area[j].place_url,
        PLAN_SHOP_CATE: area[j].category_name,
        PLAN_POINT_NAME: area[j].place_name,
        PLAN_ADDR: area[j].address_name,
        PLAN_ADDR_ROAD: area[j].road_address_name,
      };
      planByDay.push(planInfo);
    }
    plan.push(planByDay);
  }

  return plan;
}

export async function uploadPlan2DB(data) {
  const schedule_upload = makeScheduleUploadData(data);
  const plan_upload = makePlanUploadData(data);
  await axios
    .post('http://localhost:8000/uploadPlan', {
      schedule: JSON.stringify({ data: schedule_upload }),
      plan: JSON.stringify({ data: plan_upload }),
    })
    .then((res) => {
      ({ data } = res);
      if (data === 'success') alert('저장완료되었습니다!');
    })
    .catch((e) => {
      console.error(e);
    });
  return data;
}

export function emptyPlan() {
  var plan = {
    noEditted: true,
    day: '1일차', //n일차
    area: [], //저장한 가고싶은 장소 객체배열
    memo: [],
  };
  return plan;
}
export function getMarkerListSrc() {
  var arr = [
    //29박 30일까지 커버... 몇번만 보여주면 되니까.. 이제 생각하는것도 좀 그만두고싶음..ㅠㅠ
    '/rainbow_marker/blue_marker.png',
    '/rainbow_marker/green_marker.png',
    '/rainbow_marker/indigo_marker.png',
    '/rainbow_marker/orange_marker.png',
    '/rainbow_marker/purple_marker.png',
    '/rainbow_marker/red_marker.png',
    '/rainbow_marker/yellow_marker.png',

    '/rainbow_marker/blue_marker.png',
    '/rainbow_marker/green_marker.png',
    '/rainbow_marker/indigo_marker.png',
    '/rainbow_marker/orange_marker.png',
    '/rainbow_marker/purple_marker.png',
    '/rainbow_marker/red_marker.png',
    '/rainbow_marker/yellow_marker.png',

    '/rainbow_marker/blue_marker.png',
    '/rainbow_marker/green_marker.png',
    '/rainbow_marker/indigo_marker.png',
    '/rainbow_marker/orange_marker.png',
    '/rainbow_marker/purple_marker.png',
    '/rainbow_marker/red_marker.png',
    '/rainbow_marker/yellow_marker.png',

    '/rainbow_marker/blue_marker.png',
    '/rainbow_marker/green_marker.png',
    '/rainbow_marker/indigo_marker.png',
    '/rainbow_marker/orange_marker.png',
    '/rainbow_marker/purple_marker.png',
    '/rainbow_marker/red_marker.png',
    '/rainbow_marker/yellow_marker.png',

    '/rainbow_marker/blue_marker.png',
    '/rainbow_marker/green_marker.png',
    '/rainbow_marker/indigo_marker.png',
    '/rainbow_marker/orange_marker.png',
    '/rainbow_marker/purple_marker.png',
    '/rainbow_marker/red_marker.png',
    '/rainbow_marker/yellow_marker.png',
  ];
  return arr;
}
export var cityPoints = [
  getMapsLatLng(37.5537586, 126.9809696), //서울
  getMapsLatLng(35.1761938, 129.0797244), //부산
  getMapsLatLng(35.8714354, 128.5807879), //대구
  getMapsLatLng(37.5006814, 126.7013757), //인천
  getMapsLatLng(35.126033, 126.831302), //광주
  getMapsLatLng(36.321655, 127.378953), //대전
  getMapsLatLng(35.5396224, 129.3115276), //울산
  getMapsLatLng(36.4802462, 127.2892335), //세종
  getMapsLatLng(33.499597, 126.531254), //제주
  getMapsLatLng(37.4884577, 130.9043746), //울릉도
];

export function getPointListByCities() {}

export function getMapsLatLng(lat, lng) {
  const returnVal = new window.kakao.maps.LatLng(lat, lng);
  return returnVal;
}
var bounds = new window.kakao.maps.LatLngBounds();
export function setBounds(points, map) {
  console.log('bounds : ', points);
  for (let i = 0; i < points.length; i++) {
    bounds.extend(points[i]);
  }
  map.setBounds(bounds);
}
