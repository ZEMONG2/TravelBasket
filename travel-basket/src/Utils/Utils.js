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

function makeScheduleUploadData(data) {
  var schedule = {
    SCHEDULE_TITLE: data.title,
    SCHEDULE_PLAN: data.day,
  };
}

export async function uploadPlan2DB(data) {
  //post로 서버통신
  // const mergedData = {
  //   title: titleRef.current.value, //제목
  //   selectedArea: cityRef.current.value, //선택한지역
  //   day: daytxt, //일정(몇박 몇일)
  //   plan: planArr.plan, //여행타입
  //   trans: transArr.trans, //이동수단
  //   uploadIsopen: isopen, //공개여부
  //   finalPlan: {
  //                noEditted: true,
  //                day: '1일차', //n일차
  //                area: [{
  //                          address_name: "서울 중구 명동2가 25-36"
  //                          category_group_code: "FD6"
  //                          category_group_name: "음식점"
  //                          category_name: "음식점 > 분식"
  //                          distance: ""
  //                          id: "10332413"
  //                          phone: "02-776-5348"
  //                          place_name: "명동교자 본점"
  //                          place_url: "http://place.map.kakao.com/10332413"
  //                          road_address_name: "서울 중구 명동10길 29"
  //                          x: "126.98561429978552"
  //                          y: "37.56255453417897"
  //                        }
  //                      ], //저장한 가고싶은 장소 객체배열
  //              memo: [{
  //                      category: 2, title: 'asd', memo: 'asd'
  //                    }],
  //              };
  // };

  await axios
    .post('http://localhost:8000/uploadPlan', {})
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
  return new window.kakao.maps.LatLng(lat, lng);
}
var bounds = new window.kakao.maps.LatLngBounds();
export function setBounds(points, map) {
  for (let i = 0; i < points.length; i++) {
    bounds.extend(points[i]);
  }
  map.setBounds(bounds);
}
