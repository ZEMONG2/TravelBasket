var fs = require("fs");
let scheduleModules = {};

//특정 회원의 일정 페이징 처리된 리스트를 추출
scheduleModules.searchMySchedule = function (req, res, db) {
  var page_num = parseInt(req.body.page_num);
  var page_size = parseInt(req.body.page_size);
  const start_limit = (page_num - 1) * page_size;
  const id = req.body.id; //사용자 아이디

  const sqlQuery = `SELECT A.SCHEDULE_IDX, A.SCHEDULE_TITLE, A.SCHEDULE_PLAN, A.SCHEDULE_PLACE,
                    A.SCHEDULE_DAY
                     FROM TB_SCHEDULE AS A
                        INNER JOIN TB_USER AS B
                        ON A.USER_IDX = B.USER_IDX
                    WHERE B.USER_ID = '${id}'
                    ORDER BY A.SCHEDULE_IDX DESC LIMIT ?,?;`;

  db.query(sqlQuery, [start_limit, page_size], (err, result) => {
    // for (let i = 0; i < result.length; i++) {
    //   console.log("------------------");
    //   console.log(result[i].THUMBNAIL);
    //   fs.readFile(".." + result[i].THUMBNAIL, function (error, data) {
    //     console.log(data);
    //   });
    // }

    res.send(result);
  });
};

//요청한 썸네일 경로를 받아서 보내주는 함수
scheduleModules.sendThumbnail = function (req, res) {
  var file_route = "../server/thumbnail/" + req.params.filename; //썸네일 경로

  fs.readFile(file_route, function (error, data) {
    //위 경로에 있는 썸네일을읽어서 클라이언트(리액트)로 전송.
    res.writeHead(200, { "Context-Type": "image/jpg" }); //보내는 데이터의 헤더에 파일의 타입을 기재
    res.write(data); //이부분에서 전송
    res.end(); //응답을 종료.
  });
};

scheduleModules.searchMySchedule2 = function (req, res, db) {
  const id = req.body.id; //사용자 아이디
  //const id = "ksw3108";

  //user테이블과 조인해서 user id를 기준으로 테이블 조회를 실행하는 쿼리
  const sqlQuery = `SELECT * FROM TB_SCHEDULE AS A
                        INNER JOIN TB_USER AS B
                        ON A.USER_IDX = B.USER_IDX
                    WHERE B.USER_ID = '${id}';`;
  //넘겨받은 db 객체 프로퍼티로 작업 수행
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
  return;
};

scheduleModules.countMySchedule = function (req, res, db) {
  const id = req.body.id; //사용자 아이디
  //const id = "ksw3108";

  //user테이블과 조인해서 user id를 기준으로 테이블 조회를 실행하는 쿼리
  //페이징을 위한 등록된 모든 일정 갯수 추출
  const sqlQuery = `SELECT COUNT(*) AS COUNT FROM TB_SCHEDULE AS A
                        INNER JOIN TB_USER AS B
                        ON A.USER_IDX = B.USER_IDX
                    WHERE B.USER_ID = '${id}';`;
  //console.log(sqlQuery);
  //넘겨받은 db 객체 프로퍼티로 작업 수행
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
  return;
};

scheduleModules.countAllSchedule = function (req, res, db) {
  const SCHEDULE_PLACE = req.body.schedule_place; //사용자 아이디
  const SCHEDULE_TOGETHER = req.body.schedule_together;
  const SCHEDULE_VEHICLE = req.body.schedule_vehicle;
  //const id = "ksw3108";

  //user테이블과 조인해서 user id를 기준으로 테이블 조회를 실행하는 쿼리
  //페이징을 위한 등록된 모든 일정 갯수 추출
  var sqlQuery = `SELECT COUNT(*) AS COUNT FROM TB_SCHEDULE AS A
                        INNER JOIN TB_USER AS B
                        ON A.USER_IDX = B.USER_IDX 
                        WHERE SCHEDULE_OX = 'O' `;
  var subquery = ` `;
  if (SCHEDULE_PLACE !== "-1") subquery += ` AND A.SCHEDULE_PLACE = ${SCHEDULE_PLACE} `;
  if (SCHEDULE_TOGETHER.length >= 2) subquery += ` AND A.SCHEDULE_TOGETHER REGEXP '${SCHEDULE_TOGETHER}'`;
  if (SCHEDULE_VEHICLE.length >= 2) subquery += ` AND A.SCHEDULE_VEHICLE REGEXP '${SCHEDULE_VEHICLE}'`;

  //console.log("count => ", sqlQuery + subquery + ";");
  sqlQuery += subquery + ";";
  //넘겨받은 db 객체 프로퍼티로 작업 수행
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
};

//일정 페이징 처리된 리스트를 추출
scheduleModules.searchAllSchedule = function (req, res, db) {
  var page_num = parseInt(req.body.page_num);
  var page_size = parseInt(req.body.page_size);
  const start_limit = (page_num - 1) * page_size;
  const SCHEDULE_PLACE = req.body.schedule_place;
  const SCHEDULE_TOGETHER = req.body.schedule_together;
  const SCHEDULE_VEHICLE = req.body.schedule_vehicle;

  var sqlQuery = `SELECT A.SCHEDULE_IDX, A.SCHEDULE_TITLE, A.SCHEDULE_PLAN, A.SCHEDULE_PLACE,
                    A.SCHEDULE_DAY, A.SCHEDULE_LIKE, A.SCHEDULE_LOOK, B.USER_ID, B.USER_NICK, 
                    DATE_FORMAT(A.SCHEDULE_DATE, '%Y-%m-%d %T') AS SCHEDULE_DATE,
                    TIMEDIFF(NOW(), A.SCHEDULE_DATE) AS DATE_DIFF          
                     FROM TB_SCHEDULE AS A
                        LEFT JOIN TB_USER AS B
                        ON A.USER_IDX = B.USER_IDX
                    WHERE SCHEDULE_OX = 'O'`;

  var subquery = ` `;
  if (SCHEDULE_PLACE !== "-1") subquery += ` AND A.SCHEDULE_PLACE = ${SCHEDULE_PLACE} `;
  //console.log(SCHEDULE_TOGETHER, SCHEDULE_TOGETHER.length);
  if (SCHEDULE_TOGETHER.length >= 2) subquery += ` AND A.SCHEDULE_TOGETHER REGEXP '${SCHEDULE_TOGETHER}'`;
  if (SCHEDULE_VEHICLE.length >= 2) subquery += ` AND A.SCHEDULE_VEHICLE REGEXP '${SCHEDULE_VEHICLE}'`;

  subquery += ` ORDER BY A.SCHEDULE_DATE DESC LIMIT ?,?;`;
  //console.log(sqlQuery + subquery, page_num, page_size);

  console.log("list => ", sqlQuery + subquery);
  db.query(sqlQuery + subquery, [start_limit, page_size], (err, result) => {
    res.send(result);
  });
};

scheduleModules.scheduleViewCounter = function (req, res, db) {
  //일정 조회수 카운팅
  var schedule_idx = parseInt(req.body.schedule_idx);

  var sqlQuery = `UPDATE TB_SCHEDULE SET SCHEDULE_LOOK = SCHEDULE_LOOK+1 WHERE SCHEDULE_IDX=${schedule_idx};`;

  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
};

scheduleModules.scheduleLikeChecker = function (req, res, db) {
  //좋아요 카운팅 체크(좋아요를 한번만 누르게 체크하는 변수)
  var schedule_idx = parseInt(req.body.schedule_idx);
  var user_id = req.body.user_id;
  var sqlQuery = `SELECT * FROM TB_SCHEDULE_LIKE AS A
                    INNER JOIN TB_USER AS B ON A.USER_IDX = B.USER_IDX
                    INNER JOIN TB_SCHEDULE AS C ON A.SCHEDULE_IDX = C.SCHEDULE_IDX  
                  WHERE A.SCHEDULE_IDX=${schedule_idx}
                    AND B.USER_ID='${user_id}';`;

  //console.log(sqlQuery + subquery, page_num, page_size);

  console.log("like_select => ", sqlQuery);
  db.query(sqlQuery, (err, result) => {
    console.log("result => ", result);
    scheduleLikeCounter(req, res, db, result);
    //res.send(result);
  });
};

scheduleModules.getScheduleLike = function (req, res, db) {
  //좋아요 카운팅 체크(좋아요를 한번만 누르게 체크하는 변수)
  var schedule_idx = parseInt(req.body.schedule_idx);
  var user_id = req.body.user_id;
  var sqlQuery = `SELECT * FROM TB_SCHEDULE_LIKE AS A
                    INNER JOIN TB_USER AS B ON A.USER_IDX = B.USER_IDX
                    INNER JOIN TB_SCHEDULE AS C ON A.SCHEDULE_IDX = C.SCHEDULE_IDX  
                  WHERE A.SCHEDULE_IDX=${schedule_idx}
                    AND B.USER_ID='${user_id}';`;

  //console.log(sqlQuery + subquery, page_num, page_size);

  console.log("like_select => ", sqlQuery);
  db.query(sqlQuery, (err, result) => {
    console.log("result => ", result);

    res.send(result);
  });
};

const scheduleLikeCounter = (req, res, db, result) => {
  //좋아요 카운팅
  var schedule_idx = parseInt(req.body.schedule_idx);
  var user_id = req.body.user_id;
  var user_idx = req.body.user_idx;
  var sqlQuery = "";
  var sql_is_like = "";
  console.log("is_like => ", result);
  if (result.length > 0) {
    //좋아요를 누른적이 있으면
    var like_ox = "O";
    if (result[0].LIKE_OX === "O") like_ox = "X";
    sql_is_like = `UPDATE TB_SCHEDULE_LIKE SET LIKE_OX = '${like_ox}' 
                    WHERE SCHEDULE_IDX=${schedule_idx} AND USER_IDX=${user_idx};`;

    sqlQuery = `UPDATE TB_SCHEDULE SET SCHEDULE_LIKE = (
                    SELECT COUNT(*) AS COUNT FROM TB_SCHEDULE_LIKE WHERE SCHEDULE_IDX=${schedule_idx} AND LIKE_OX = 'O'
                  )  
                  WHERE SCHEDULE_IDX=${schedule_idx};`;
  } else {
    sqlQuery = `UPDATE TB_SCHEDULE SET SCHEDULE_LIKE = SCHEDULE_LIKE+1 WHERE SCHEDULE_IDX=${schedule_idx};`;
    sql_is_like = `INSERT INTO TB_SCHEDULE_LIKE(SCHEDULE_IDX, USER_IDX, LIKE_OX) 
                  VALUES(${schedule_idx}, ${user_idx}, 'O');`;
  }

  console.log("add like => ", sql_is_like, sqlQuery);

  db.query(sql_is_like + sqlQuery, (err, result) => {
    console.log("result => ", result);
    console.log("err => ", err);
    res.send(result);
  });
};

const searchAllInclude = (type, arrstr) => {
  //모두 포함하는 조건식 생성
  var arr = arrstr.split("|");
  var arr2 = [];
  var query = "AND ";
  for (let i = 0; i < arr.length; i++) {
    arr2.push(type + "= '%" + arr[i] + "%'");
  }
  console.log(arr2.join(" AND "));
  return " AND " + arr2.join(" AND ");
};

module.exports = scheduleModules;
