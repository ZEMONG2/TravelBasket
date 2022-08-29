import axios from 'axios';
const Kakao = axios.create({
  baseURL: 'https://dapi.kakao.com', // 공통 요청 경로를 지정
  headers: {
    Authorization: 'KakaoAK 33ec49a0a01fea5ce27608a930ba0695', // 공통으로 요청 할 헤더 {kakao rest api key}
  },
});

// search blog api
export const blogSearch = (params) => {
  return Kakao.get('/v2/search/blog', { params });
};
