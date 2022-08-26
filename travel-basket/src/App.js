import { Route, Routes } from 'react-router-dom';

/* Board */
import ReviewList from '../src/components/Board/ReviewList';
import ReviewModify from '../src/components/Board/ReviewModify';
import ReviewView from '../src/components/Board/ReviewView';
import ReviewWrite from '../src/components/Board/ReviewWrite';

/* Header */
import Basket from '../src/components/Header/Basket';
import Header from '../src/components/Header/Header';
import Loading from '../src/components/Header/Loading';
import NotFound from '../src/components/Header/NotFound';
import Scheduleboard from '../src/components/Header/Scheduleboard';

/* Login */
import Forgot from '../src/components/Login/Forgot';
import KakaoLogin from '../src/components/Login/KakaoLogin';
import Login from '../src/components/Login/Login';
import ModifyInfo from '../src/components/Login/ModifyInfo';
import Nick from '../src/components/Login/Nick';
import Register from '../src/components/Login/Register';

/* Main */
import Main from '../src/components/Main/Main';

/* Plan */
import PlanMaker from '../src/components/Plan/PlanMaker';
import PlanMap from '../src/components/Plan/container/PlanMap';

/* Schedule */
import Schedule from '../src/components/Schedule/Schedule';

/* 그외 */
import './css/App.scss';
import background from '../src/img/summer.mp4';

const App = () => {
  return (
    <>
      <video autoPlay loop muted playsInline>
        <source src={background} type="video/mp4"></source>
      </video>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          {/* 회원가입 */}
          <Route path="/register" element={<Register />} />
          {/* 후기 게시판 */}
          <Route path="/review" element={<ReviewList />} />
          <Route path="/review/modify/:idx" element={<ReviewModify />} />
          <Route path="/review/view/:idx" element={<ReviewView />} />
          <Route path="/review/write" element={<ReviewWrite />} />

          {/* 장바구니 */}
          <Route path="/basket" element={<Basket />} />
          {/* 회원정보 수정 */}
          <Route path="/modify" element={<ModifyInfo />} />
          {/* 404 */}
          <Route path="/*" element={<NotFound />} />
          {/* 로딩 */}
          <Route path="/loading" element={<Loading />} />
          {/* 카카오로그인 */}
          <Route path="/kakao/callback" element={<KakaoLogin />} />
          {/* 비밀번호 찾기 */}
          <Route path="/forgot" element={<Forgot />} />
          {/* 카카오 닉네임설정 */}
          <Route path="/nick/:id" element={<Nick />} />

          {/* 일정 만들기 */}
          <Route path="/makeplan" element={<PlanMaker />} />
          {/* 일정 공유 게시판 */}
          <Route path="/schedule_board" element={<Scheduleboard />} />
          {/* 내 일정 보관함 */}
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </div>

      <footer className="footer">&copy; TRAVEL BASKET</footer>
      {/* 회사소개 | 개인정보처리방침 | 여행약관 | 사이트맵 */}
    </>
  );
};

export default App;
