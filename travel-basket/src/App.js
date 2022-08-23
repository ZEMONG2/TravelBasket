import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Basket from "./components/Basket";
import Main from "./components/Main";
import Schedule from "./components/Schedule";
import Login from "./components/Login";
import Register from "./components/Register";
import ReviewList from "./components/board/ReviewList";
import ReviewModify from "./components/board/ReviewModify";
import ReviewView from "./components/board/ReviewView";
import ReviewWrite from "./components/board/ReviewWrite";
import NotFound from "./components/NotFound";
import "./css/App.scss";
import background from "../src/img/summer.mp4";
import Loading from "./components/Loading";
import KakaoLogin from "./components/KakaoLogin";
import Forgot from "./components/Forgot";
import Nick from "./components/Nick";
import ModifyInfo from "./components/ModifyInfo";

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
          {/* 일정 공유 게시판 */}
          <Route path="/schedule" element={<Schedule />} />
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
        </Routes>
      </div>

      <footer className="footer">&copy; TRAVEL BASKET</footer>
      {/* 회사소개 | 개인정보처리방침 | 여행약관 | 사이트맵 */}
    </>
  );
};

export default App;
