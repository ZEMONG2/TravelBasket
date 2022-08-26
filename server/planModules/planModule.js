let planModule = {};

planModule.getCartList = function (req, res, db) {
  const id = req.body.id; //사용자 아이디
  //const id = "ksw3108";

  //장바구니에 저장된 리스트를 가져오는 테이블
  const sqlQuery = `SELECT * FROM TB_CART AS A
                        INNER JOIN TB_USER AS B
                        ON A.USER_IDX = B.USER_IDX
                    WHERE B.USER_ID = '${id}';`;

  //넘겨받은 db 객체 프로퍼티로 작업 수행
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
  return;
};

//n일차 저장에 사용될 카테고리 리스트 추출
planModule.getPlanCategory = function (req, res, db) {
  const id = req.body.id; //사용자 아이디
  //const id = "ksw3108";

  //장바구니에 저장된 리스트를 가져오는 테이블
  const sqlQuery = `SELECT * FROM TB_PLACE_CATE;`;

  //넘겨받은 db 객체 프로퍼티로 작업 수행
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
  return;
};

planModule.uploadPlan = function (req, res, db) {
  const id = req.body.id; //사용자 아이디
  //const id = "ksw3108";

  //장바구니에 저장된 리스트를 가져오는 테이블
  const sqlQuery = `SELECT * FROM TB_PLACE_CATE;`;

  //넘겨받은 db 객체 프로퍼티로 작업 수행
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
  return;
};

module.exports = planModule;
