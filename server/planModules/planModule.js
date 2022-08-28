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

//일정 삭제하기
planModule.deletePlan = function (req, res, db) {
  const schedule_idx = req.body.schedule_idx; //사용자 아이디
  //const id = "ksw3108";

  //장바구니에 저장된 리스트를 가져오는 테이블
  const sqlQuery = `DELETE FROM TB_SCHEDULE WHERE SCHEDULE_IDX = ${schedule_idx}`;
  console.log(sqlQuery);
  //넘겨받은 db 객체 프로퍼티로 작업 수행
  db.query(sqlQuery, (err, result) => {
    if (err) return res.send("fail");
    else return res.send("success");
  });
  return;
};

//내 일정 불러오기
planModule.getMyPlan = function (req, res, db) {
  const user_id = req.body.user_id;
  const schedule_idx = req.body.schedule_idx;
  var sqlQuery = `SELECT *
  FROM TB_PLAN AS A
  INNER JOIN TB_SCHEDULE AS B ON A.SCHEDULE_IDX = B.SCHEDULE_IDX
  INNER JOIN TB_USER AS C ON B.USER_IDX = C.USER_IDX
  WHERE C.USER_ID = '${user_id}' AND B.SCHEDULE_IDX = ${schedule_idx};`;
  console.log(sqlQuery);
  db.query(sqlQuery, (err, result) => {
    res.json(result);
  });
  return;
};

planModule.uploadPlan = function (req, res, db) {
  const schedule = JSON.parse(req.body.schedule); //사용자 아이디가
  const plan = JSON.parse(req.body.plan);

  //const id = "ksw3108";
  //console.log("schedule ==> ", schedule);

  var sqlQuery = `INSERT INTO TB_SCHEDULE(
    SCHEDULE_TITLE, SCHEDULE_PLAN, SCHEDULE_PLACE,
    SCHEDULE_DAY, SCHEDULE_OX, USER_IDX, SCHEDULE_VEHICLE,
    SCHEDULE_TOGETHER) 
    VALUES(
    '${schedule.data.SCHEDULE_TITLE}',
    '${schedule.data.SCHEDULE_PLAN}',
    ${schedule.data.SCHEDULE_PLACE},
    '${schedule.data.SCHEDULE_DAY}',
    '${schedule.data.SCHEDULE_OX}',
    ${schedule.data.USER_IDX},
    '${schedule.data.SCHEDULE_VEHICLE}',
    '${schedule.data.SCHEDULE_TOGETHER}'
    );`;
  //console.log(schedule_query);
  console.log("plan ==> ", plan);
  var plan_query = `INSERT INTO tb_plan(     
        SCHEDULE_IDX,      PLAN_DAYS,      P_CATE_IDX,      
        PLAN_TITLE,      PLAN_MEMO,      PLAN_LAT,      
        PLAN_LNG,      PLAN_LINK,      PLAN_POINT_NAME,     
        PLAN_ADDR,      PLAN_ADDR_ROAD,      PLAN_SHOP_CATE) VALUES`;
  sqlQuery += plan_query;
  var planqueryarr = [];
  for (let i = 0; i < plan.data.length; i++) {
    const planbydays = plan.data[i];
    for (let j = 0; j < planbydays.length; j++) {
      const data = planbydays[j];
      console.log(`${i + 1}일차 => `, data);

      const sub_sql = `
      (LAST_INSERT_ID(),
      '${data.PLAN_DAYS}',
      ${data.P_CATE_IDX},
      '${data.PLAN_TITLE}',
      '${data.PLAN_MEMO}',
      '${data.PLAN_LAT}',
      '${data.PLAN_LNG}',
      '${data.PLAN_LINK}',
      '${data.PLAN_POINT_NAME}',
      '${data.PLAN_ADDR}',
      '${data.PLAN_ADDR_ROAD}',
      '${data.PLAN_SHOP_CATE}')
      `;
      console.log(sub_sql);
      planqueryarr.push(sub_sql);
    }
  }
  sqlQuery += planqueryarr.join(",") + ";";
  console.log(sqlQuery);
  //장바구니에 저장된 리스트를 가져오는 테이블

  //넘겨받은 db 객체 프로퍼티로 작업 수행
  db.query(sqlQuery, (err, result) => {
    if (err) return res.send("fail");
    else return res.send("success");
  });
};

module.exports = planModule;
