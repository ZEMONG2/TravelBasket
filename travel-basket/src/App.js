import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Basket from "./components/Basket";
import Main from "./components/Main";
import Schedule from "./components/Schedule";
import Login from "./components/Login";
import Register from "./components/Register";
import Review from "./components/Review";
import NotFound from "./components/NotFound";
import "./css/App.scss";
import background from "../src/img/summer.mp4";
import Loading from "./components/Loading";

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
          <Route path="/review" element={<Review />} />
          {/* 일정 공유 게시판 */}
          <Route path="/schedule" element={<Schedule />} />
          {/* 장바구니 */}
          <Route path="/basket" element={<Basket />} />
          {/* 404 */}
          <Route path="/*" element={<NotFound />} />
          {/* 로딩 */}
          <Route path="/loading" element={<Loading />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
