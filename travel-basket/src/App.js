import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Schedule from "./components/Schedule";
import Login from "./components/Login";
import Register from "./components/Register";
import Review from "./components/Review";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
const App = () => {
  return (
    <div>
      {/*
        20220817 선우 - 추가 작업(line 16)
         1. 모든 페이지에 공통으로 적용되는 헤더 파츠추가
       */}
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/review" element={<Review />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
