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
    day: '1일차', //n일차
    area: [], //저장한 가고싶은 장소 객체배열
    memo: [],
  };
  return plan;
}
