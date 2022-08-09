import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";

function App() {
  const submitTest = () => {
    Axios.get("http://localhost:4000/", {}).then(() => {
      alert("등록 완료!");
    });
  };
  return <button onClick={submitTest}>글쓰기</button>;
}

export default App;
