import { useEffect, useState, useRef } from "react";
import Axios from "axios";

function App() {
  const [boardData, setBoardData] = useState({
    title: "",
    content: "",
    id: "",
  });
  // const delRef = useRef([]);
  const [boardDataView, setBoardDataView] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/select").then((res) => {
      setBoardDataView(res.data);
    });
  }, [boardDataView]);

  const boardSubmit = () => {
    Axios.post("http://localhost:8000/api/insert", {
      title: boardData.title,
      content: boardData.content,
      id: boardData.id,
    }).then(() => {
      alert("등록 완료!");
    });
    const nextBoardData = {
      ...boardData,
      title: "",
      content: "",
      id: "",
    };
    setBoardData(nextBoardData);
  };

  const getBoardData = (e) => {
    const { name, value } = e.target;
    setBoardData({
      ...boardData,
      [name]: value,
    });
  };

  // function boardDelete(idx) {
  //   Axios.post("http://localhost:8000/api/delete/", {
  //     num: idx,
  //   }).then(() => {
  //     alert("삭제 완료!");
  //   });
  // }
  return (
    <div>
      <h1>BOARD LIST</h1>
      <div className="board-list">
        <table border="1px solid">
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>내용</th>
            <th>작성자</th>
            <th></th>
          </tr>

          {boardDataView.map((boardDataView) => (
            <tr key={boardDataView.num}>
              <td>{boardDataView.num}</td>
              <td>{boardDataView.title}</td>
              <td>{boardDataView.content}</td>
              <td>{boardDataView.id}</td>
              <td>
                {/* <button
                  key={boardDataView.num}
                  ref={(ref) => (delRef.current[boardDataView.num] = ref)}
                  className="delete-button"
                  onClick={boardDelete(boardDataView.num)}
                >
                  삭제
                </button> */}
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className="board-form">
        <input
          className="title-input"
          type="text"
          placeholder="제목"
          onChange={getBoardData}
          value={boardData.title}
          name="title"
        />
        <input
          className="content-input"
          type="text"
          placeholder="내용"
          onChange={getBoardData}
          value={boardData.content}
          name="content"
        />
        <input
          className="id-input"
          type="text"
          placeholder="아이디"
          onChange={getBoardData}
          value={boardData.id}
          name="id"
        />
      </div>
      <button className="submit-button" onClick={boardSubmit}>
        입력
      </button>
    </div>
  );
}

export default App;
