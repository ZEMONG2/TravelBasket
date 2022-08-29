let NaverApiModule = {};

const NAVER_CLIENT_ID = "YZKC2K4_Fvqx_rEPI_BE";
const NAVER_CLIENT_SECRET = "jPPEV84uAd";

//특정 회원의 일정 페이징 처리된 리스트를 추출
NaverApiModule.searchData = function (req, res) {
  //const keyword = encodeURI(req.params.keyword);
  //const keyword = req.params.keyword;
  const keyword = req.body.keyword;
  const page = req.body.page;
  var api_url = "https://openapi.naver.com/v1/search/local";
  console.log(keyword, page);
  var request = require("request");
  var options = {
    url: api_url,
    qs: {
      query: keyword,
      //query: req.params.keyword,
      start: page, // 검색 시작 위치
      display: 5, // 가져올 갯수
      sort: "sim", // 정렬 유형(sim:유사도)
    },
    headers: {
      "X-Naver-Client-Id": NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
    },
  };
  console.log(options);

  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });

  console.log("server : ", api_url);
};

module.exports = NaverApiModule;
