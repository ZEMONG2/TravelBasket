import { KAKAO_REST_API_KEY } from '../../auth/Auth';
import { KAKAO_REDIRECT_URI } from '../../auth/Auth';
import { KAKAO_CLIENT_SECRET } from '../../auth/Auth';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
const KakaoLogin = () => {
  // 현재 주소 불러오기
  const location = useLocation();

  // 인가코드
  const code = location.search.split('=')[1];
  let token = '';

  // 아래 방식으로도 인가코드를 추출할 수 있음
  // let code = new URL(window.location.href).searchParams.get("code");

  const navigate = useNavigate();

  // 카카오 토큰 요청 기본 URL
  const baseUrl = 'https://kauth.kakao.com/oauth/token';

  // 함께 담아가야할 정보
  // 주의사항 : 키값은 카카오 API에 있는 그래도 작성하여야 한다.
  const config = {
    client_id: KAKAO_REST_API_KEY,
    client_secret: KAKAO_CLIENT_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: KAKAO_REDIRECT_URI,
    code: code,
  };
  // URLSearchParams 매서드는 객체에 있는 문자열을 URL처럼 뭉쳐주지만 오브젝트로 반환 되기때문에 toString으로 문자열로 바꿔준다
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  // 인가코드를 가지고 토큰을 발급 받는 과정
  // 주의사항 인가코드는 1회성 오류나 다른 상황 발생시 새로 인가코드 발급부터 진행 하여야 한다
  axios
    .get(finalUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // application/json 타입 선언
      },
    })
    .then((res) => {
      console.log('정보확인', res);

      // 응답받은 값에서 access_token을 추출
      token = res.data.access_token;
      console.log('token :', token);
    })
    .catch((e) => {
      console.error(e);
    })

    .then(() => {
      console.log('토큰 다시 확인 : ', token);

      // 토큰은 매번 다르다
      // 토큰을 추출 하고 다시 한번더 사용자 정보 요청
      axios
        .get('https://kapi.kakao.com/v2/user/me', {
          headers: {
            //인증받은 토큰을 담아 보낸다
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        })
        .then((res) => {
          // 응답받은 카카오 사용자 정보
          console.log('데이터확인 :', res);
          var kakaoEmail = res.data.kakao_account.email;

          // 카카오 회원정보 데이터베이스 확인 및 저장
          axios
            .post('http://localhost:8000/kakaoJoin', {
              id: kakaoEmail,
            })
            .then((res) => {
              // 입력한 정보와 동일한 사용자가 없으면
              if (res.data.length === 0) {
                // 회원테이블에 추가
                navigate(`/nick/${kakaoEmail}`);
              } else {
                // 이미 추가된 회원이라면
                // 로그인에 성공하고 세션에 값 저장
                window.sessionStorage.setItem('USER_ID', res.data[0].USER_ID);
                window.sessionStorage.setItem(
                  'USER_NICK',
                  res.data[0].USER_NICK,
                );
                window.sessionStorage.setItem('USER_IDX', res.data[0].USER_IDX);
                window.sessionStorage.setItem(
                  'JOIN_PATH',
                  res.data[0].JOIN_PATH,
                );

                // 세션생성후 메인페이지로
                navigate('/');
              }
            })
            .catch((e) => {
              console.error(e);
            });
        })
        .catch((e) => {
          console.error(e);
        });
    });
};

export default KakaoLogin;
