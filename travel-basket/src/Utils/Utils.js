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

export function emptyPlan() {
  var plan = {
    noEditted: true,
    day: '1일차', //n일차
    area: [], //저장한 가고싶은 장소 객체배열
    memo: [],
  };
  return plan;
}
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
export function getMarkerListSrc() {
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
