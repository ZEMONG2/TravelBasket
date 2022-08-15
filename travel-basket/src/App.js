import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Schedule from "./components/Schedule";
import Login from "./components/Login";
import Register from "./components/Register";
import Review from "./components/Review";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/review" element={<Review />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
