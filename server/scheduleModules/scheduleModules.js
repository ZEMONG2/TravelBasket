var fs = require("fs");
let scheduleModules = {};

//특정 회원의 일정 페이징 처리된 리스트를 추출
scheduleModules.searchMySchedule = function (req, res, db) {
  var page_num = parseInt(req.body.page_num);
  var page_size = parseInt(req.body.page_size);
  const start_limit = (page_num - 1) * page_size;
  const id = req.body.id; //사용자 아이디

  const sqlQuery = `SELECT A.SCHEDULE_IDX, A.SCHEDULE_TITLE, A.THUMBNAIL FROM TB_SCHEDULE AS A
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
  console.log(sqlQuery);
  //넘겨받은 db 객체 프로퍼티로 작업 수행
  db.query(sqlQuery, (err, result) => {
    console.log("res => ", result);
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

  //넘겨받은 db 객체 프로퍼티로 작업 수행
  db.query(sqlQuery, (err, result) => {
    console.log("res => ", result);
    res.send(result);
  });
  return;
};

module.exports = scheduleModules;
