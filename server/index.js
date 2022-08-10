const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");

// 기본 PORT번호는 8000으로 PORT를 따로 선언할 경우 선언한 PORT번호로 사용
const PORT = process.env.port || 8000;

// 교차 출처 리소스 공유 ( Cross-Origin Resource Sharing, CORS)
const cors = require("cors");
/*
한 출처에서 실행 중인 웹 애플리케이션이 다른 출처의 선택한 자원에 접근할 수 있는 권한을 부여하도록 브라우저에 알려주는 체제이다.
웹 애플리케이션은 리소스가 자신의 출처(도메인, 프로토콜, 포트)와 다를 때 교차 출처 HTTP 요청을 실행한다.
EX) https://domain-a.com 의 프론트엔드에서 https://domain-b.com/data.json을 요청하는 경우
*/

// 디비 서버 port번호는 default 3306
const db = mysql.createPool({
  host: "210.114.22.116",
  user: "js_team_5",
  password: "tb123456",
  database: "js_team_5",
});

app.use(cors());
app.use(express.json());

// true 일경우 따로 설치가 필요한 npm qs (querystring) 라이브러리를 사용. false 일경우 node.js에 기본적으로 내장되어있는 qs 라이브러리를 사용하겠다는 의미
app.use(bodyParser.urlencoded({ extended: true }));

// DB에 저장된 목록 불러오기
app.get("/api/select", (req, res) => {
  const sqlQuery = "SELECT * FROM test";
  db.query(sqlQuery, (err, result) => {
    // 목록 조회 기능 이기 때문에 요청을 처리한후 응답을 해주어야 한다.
    // 응답은 요청의 결과를 담고있는 result를 보낸다
    res.send(result);
  });
});

// app.post("/api/delete", (req, res) => {
//   const boardNum = req.body.num;
//   const sqlQuery = "DELETE FROM test WHERE num = ?";
//   db.query(sqlQuery, boardNum, (err, result) => {
//     res.send("delete success!");
//   });
// });

// DB에 데이터 추가하기
app.post("/api/insert", (req, res) => {
  // post방식으로 처리 했기때문에 request의 body부분에 데이터가 들어있음
  // req.body.? : 내가 보낸 키값을 호출시 각각의 데이터를 불러올 수 있음
  const title = req.body.title;
  const content = req.body.content;
  const id = req.body.id;

  // SQL문에서 변수 처리 해야할 부분은 ? 처리
  const sqlQuery = "INSERT INTO test (title, content, id) VALUES (?,?,?)";

  // db.query(sql문, ?를 대치할 값 (?가 많을경우 배열로), (err, result) => { });
  db.query(sqlQuery, [title, content, id], (err, result) => {
    res.send("insert success!");
  });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
