import { Route, Routes } from 'react-router-dom';

/* Board */
import ReviewList from '../src/components/Board/ReviewList';
import ReviewModify from '../src/components/Board/ReviewModify';
import ReviewView from '../src/components/Board/ReviewView';
import ReviewWrite from '../src/components/Board/ReviewWrite';
/* Storage */
import ReviewStorage from '../src/components/Board/ReviewStorage';
import LikeStorage from '../src/components/Board/LikeStorage';

/* Header */
import Header from '../src/components/Header/Header';
import Loading from '../src/components/Header/Loading';
import NotFound from '../src/components/Header/NotFound';
import Scheduleboard from '../src/components/Header/Scheduleboard';
import HowToUse from './components/Header/HowToUse';
/* Basket */
import Basket from '../src/components/Basket/Basket';

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
import MyPlan from '../src/components/MyPlan/MyPlan'; //220826 선우 내 일정 상세보기

/* Schedule */
import Schedule from '../src/components/Schedule/Schedule';

/* About */
import About from './components/About/About'

/* 그외 */
import './css/App.scss';
import background from '../src/img/winter.mp4';
//import Loading from './components/Loading';
//import KakaoLogin from './components/KakaoLogin';
//import Forgot from './components/Forgot';
//import Nick from './components/Nick';
//import ModifyInfo from './components/ModifyInfo';
//import NaverLogin from './components/NaverLogin';

//20220822 선우 병합
//import PlanMaker from './components/Plan/PlanMaker';
//import Schedule from './components/Schedule/Schedule';

//드래그앤드랍 테스트용
import DnDPractice from './components/Plan/DnDPractice';

//import Schedule from './components/Schedule';
// =======
// import { Route, Routes } from "react-router-dom";
// import Header from "./components/Header";
// import Basket from "./components/Basket";
// import Main from "./components/Main";
// import Schedule from "./components/Schedule";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import ReviewList from "./components/board/ReviewList";
// import ReviewModify from "./components/board/ReviewModify";
// import ReviewView from "./components/board/ReviewView";
// import ReviewWrite from "./components/board/ReviewWrite";
// import NotFound from "./components/NotFound";
// import "./css/App.scss";
// import background from "../src/img/summer.mp4";
// import Loading from "./components/Loading";
// import KakaoLogin from "./components/KakaoLogin";
// import Forgot from "./components/Forgot";
// import Nick from "./components/Nick";
// import ModifyInfo from "./components/ModifyInfo";
// >>>>>>> main

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
          {/* 후기 & 좋아요 보관함 */}
          <Route path="/storage/review" element={<ReviewStorage />} />
          <Route path="/storage/like" element={<LikeStorage />} />

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
          {/* 내 일정 상세보기 */}
          <Route path="/myplan" element={<MyPlan />} />

          {/* 220902 선우 이용 안내 */}
          <Route path="/howtouse" element={<HowToUse />} />

          {/* About */}
          <Route path="/about" element={<About />} />

          {/* 드래그앤드랍 테스트용 */}
          {/* <Route path="/test" element={<DnDPractice />} /> */}
        </Routes>
      </div>

      <footer className="footer">&copy; TRAVEL BASKET</footer>
      {/* 회사소개 | 개인정보처리방침 | 여행약관 | 사이트맵 */}
    </>
  );
};

export default App;
