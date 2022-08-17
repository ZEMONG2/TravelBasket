let scheduleModules = {};

scheduleModules.test = function () {
  return "test!!";
};

//특정 회원의 일정 리스트를 추출
scheduleModules.searchMySchedule = function (req, res, db) {
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
    //res.send(result);
  });
  return;
};

module.exports = scheduleModules;
