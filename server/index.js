const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser"); //요청정보 처리를 위함

// 교차 출처 리소스 공유 ( Cross-Origin Resource Sharing, CORS)
const cors = require("cors"); // 교차허용
/*
한 출처에서 실행 중인 웹 애플리케이션이 다른 출처의 선택한 자원에 접근할 수 있는 권한을 부여하도록 브라우저에 알려주는 체제이다.
웹 애플리케이션은 리소스가 자신의 출처(도메인, 프로토콜, 포트)와 다를 때 교차 출처 HTTP 요청을 실행한다.
EX) https://domain-a.com 의 프론트엔드에서 https://domain-b.com/data.json을 요청하는 경우
*/

// 게시판 추가건
const multer = require("multer");
const path = require("path");
const mime = require("mime-types");
const { v4: uuid } = require("uuid");

const app = express(); //서버생성

// 기본 PORT번호는 8000으로 PORT를 따로 선언할 경우 선언한 PORT번호로 사용
const PORT = process.env.port || 8000; //포트설정

app.use(express.json());

// true 일경우 따로 설치가 필요한 npm qs (querystring) 라이브러리를 사용. false 일경우 node.js에 기본적으로 내장되어있는 qs 라이브러리를 사용하겠다는 의미
app.use(bodyParser.urlencoded({ extended: true }));

let corsOptions = {
  origin: "*", //출저 허용 옵션
  credential: true, //사용자 인증이 필요한 리소스(쿠키...등) 접근
};

app.use(cors(corsOptions));

// 디비 서버 port번호는 default 3306
const db = mysql.createPool({
  // host: "210.114.22.116",
  // user: "js_team_5",
  // password: "tb123456",
  // database: "js_team_5",
  host: "localhost",
  user: "root",
  password: "123456",
  database: "travel_test",
  // charset: "utf8mb4",
});

// DB에 저장된 아이디 패스워드와 비교하여 일치하는지 판단
app.post("/login", (req, res) => {
  console.log("/login =>", req.body);
  var id = req.body.id;
  var pw = req.body.pw;

  const sqlQuery = "SELECT * FROM TB_USER WHERE USER_ID=? AND USER_PW=?;";
  db.query(sqlQuery, [id, pw], (err, result) => {
    // 목록 조회 기능 이기 때문에 요청을 처리한후 응답을 해주어야 한다.
    // 응답은 요청의 결과를 담고있는 result를 보낸다
    console.log(result);
    console.log(typeof result);
    res.send(result);
  });
});

// 회원가입 요청
app.post("/register", (req, res) => {
  console.log("/register", req.body);
  var id = req.body.id;
  var pw = req.body.pw;
  var nick = req.body.nick;

  // 회원가입 요청한 아이디가 기존에 회원으로 가입된적이 있는지 체크
  const sqlQuery1 = "SELECT COUNT(*) AS CNT FROM TB_USER WHERE USER_ID=?;";
  db.query(sqlQuery1, id, (err, result) => {
    if (result[0].CNT === 0) {
      // 회원가입 요청
      const sqlQuery2 = "INSERT INTO TB_USER(USER_ID, USER_PW, USER_NICK) VALUES (?,?,?);";
      db.query(sqlQuery2, [id, pw, nick], (err, result) => {
        res.send("회원가입성공");
      });
    } else {
      res.send("회원가입실패");
    }
  });
});
// 소셜로그인 닉네임 중복을 막기 위한 변수
// 카카오 로그인 DB에 저장된 아이디와 가입경로를 비교하여 DB에 저장 관리
app.post("/kakaoJoin", (req, res) => {
  console.log("/kakaoJoin =>", req.body);
  var id = req.body.id;
  var nick = req.body.nick;
  var path = "KAKAO";
  var pw = "kakao";
  console.log("req.body.nick : ", typeof req.body.nick);
  console.log("nick : ", typeof nick);

  //가입경로와 아이디가 일치한 유저가 있는지 조회
  const sqlQuery1 = "SELECT * FROM TB_USER WHERE USER_ID=? AND JOIN_PATH=?;";
  db.query(sqlQuery1, [id, path], (err, result) => {
    res.send(result);
  });
});

app.post("/nickCheck", (req, res) => {
  console.log("nickCheck =>", req.body.nick);
  var nick = req.body.nick;
  const sqlQuery = "SELECT COUNT(*) AS CNT FROM TB_USER WHERE USER_NICK=?;";
  db.query(sqlQuery, nick, (err, result) => {
    res.send(result);
  });
});

app.post("/idCheck", (req, res) => {
  console.log("idCheck =>", req.body.nick);
  var id = req.body.id;
  const sqlQuery = "SELECT COUNT(*) AS CNT FROM TB_USER WHERE USER_ID=?;";
  db.query(sqlQuery, id, (err, result) => {
    res.send(result);
  });
});

app.post("/nickSend", (req, res) => {
  console.log("nickSend =>", req.body);
  var nick = req.body.nick;
  var email = req.body.email;
  var path = "KAKAO";
  var pw = "kakao";
  const sqlQuery1 = "INSERT INTO TB_USER(USER_ID, USER_PW, USER_NICK,JOIN_PATH) VALUES (?,?,?,?);";
  db.query(sqlQuery1, [email, pw, nick, path], (err, result) => {
    const sqlQuery2 = "SELECT * FROM TB_USER WHERE USER_ID=? AND JOIN_PATH=?;";
    db.query(sqlQuery2, [email, path], (err, result) => {
      res.send(result);
    });
  });
});
app.post("/modifyInfo", (req, res) => {
  console.log("modifyInfo =>", req.body);

  var id = req.body.id;
  var pw = req.body.pw;
  var nick = req.body.nick;
  console.log("id =>", id);
  console.log("pw =>", pw);
  console.log("nick =>", nick);

  const sqlQuery = "UPDATE TB_USER SET USER_NICK=?, USER_PW=? WHERE USER_ID=?;";
  db.query(sqlQuery, [nick, pw, id], (err, result) => {
    res.send("회원정보수정성공");
  });
});

// ◽ 게시판 DB (박지형)
//===========================
// REVIEW LIST
//===========================
app.get("/review", (req, res) => {
  const sqlQuery = "SELECT R.*, U.USER_NICK FROM TB_REVIEW R, TB_USER U WHERE R.USER_IDX = U.USER_IDX ORDER BY REVIEW_IDX DESC;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

//===========================
// REVIEW VIEW
//===========================
app.post("/review/view", (req, res) => {
  console.log("뷰어!!", req.body.params);

  var idx = req.body.params.idx;

  const sqlQuery = "SELECT R.*, U.USER_NICK FROM TB_REVIEW R, TB_USER U WHERE R.USER_IDX = U.USER_IDX && REVIEW_IDX=?;";
  db.query(sqlQuery, [idx], (err, result) => {
    res.send(result);
  });
});

//===========================
// REVIEW WRITE
//===========================
app.post("/review/write", (req, res) => {
  // console.log('글쓰기', req.body);
  console.log("글쓰기", req.body.idx);

  var title = req.body.title;
  var content = req.body.content;
  var user_idx = req.body.user;

  const sqlQuery = "INSERT INTO TB_REVIEW (REVIEW_TITLE, REVIEW_TXT, USER_IDX) values (?,?,?);";
  db.query(sqlQuery, [title, content, user_idx], (err, result) => {
    res.send(result);
  });
});

// ** CKeditor
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${uuid()}.${mime.extension(file.mimetype)}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (["image/jpeg", "image/jpg", "image/png"].includes(file.mimetype)) cb(null, true);
    else cb(new Error("해당 파일 형식을 지원하지 않습니다."), false);
  },
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  console.log("여기냐?");
  console.log("file", req.file);
  res.status(200).json(req.file);
});

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//===========================
// REVIEW MODIFY
//===========================
app.post("/review/modify", (req, res) => {
  console.log("수정!!!", req.body.modify);

  var idx = req.body.modify.review_idx;
  var title = req.body.modify.review_title;
  var content = req.body.content;

  const sqlQuery = "UPDATE TB_REVIEW SET REVIEW_TITLE=?, REVIEW_TXT=? WHERE REVIEW_IDX=?;";
  db.query(sqlQuery, [title, content, idx], (err, result) => {
    res.send("업데이트성공");
  });
});

//===========================
// REVIEW DELETE
//===========================
app.post("/delete", (req, res) => {
  console.log("삭제!!!", req.body.idx);
  var idx = req.body.idx;

  const sqlQuery = "DELETE FROM TB_REVIEW WHERE REVIEW_IDX=?;";
  db.query(sqlQuery, [idx], (err, result) => {
    res.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

/* ------------- 여기서부터 일정 관리 관련 ------------- 220817 선우 */

//일정 관리 모듈 객체를 생성
let scheduleModule = require("./planModules/scheduleModules");

//일정관리 리스트 호출시 아래와 같이 처리
//get 경로는 임의로 넣었으므로 추후 필요에 의한 수정 가능

//일정 리스트 추출
app.post("/schedule/list", (req, res) => {
  scheduleModule.searchMySchedule(req, res, db);
});
//일정 리스트 페이징
app.post("/schedule/count", (req, res) => {
  scheduleModule.countMySchedule(req, res, db);
});
//섬네일 경로 호출/응답 => 220823 선우 이제 안씀
// app.get("/thumbnail/:filename", (req, res) => {
//   scheduleModule.sendThumbnail(req, res);
// });
//220823 선우 - 클라이언트에 썸네일 접근 허가 => 이방식이 더 좋음
app.use("/thumbnail", express.static("thumbnail"));

//220823 선우 - 회원별 장바구니 추출
let plan = require("./planModules/planModule");
app.post("/getcart", (req, res) => {
  plan.getCartList(req, res, db);
});
//220824 선우 - 일차별 메모 저장할때 보여줄 카테고리 목록
app.get("/getPlanCate", (req, res) => {
  plan.getPlanCategory(req, res, db);
});

/* ------------- 네이버 지역 검색 api ------------- 220822 선우 */
let naverapi = require("./webApi/NaverApiModule");
app.post("/searchbynaver", (req, res) => {
  naverapi.searchData(req, res);
});
/* ------------- 카카오 지역 검색 api ------------- 220823 선우 */
let kakaoapi = require("./webApi/KaKaoApiModule");
app.post("/searchbykakao", (req, res) => {
  kakaoapi.searchData(req, res);
});

/* ------------ 카카오 마커 송출 -------------- 220826 선우 */
app.use("/rainbow_marker", express.static("rainbow_marker"));
