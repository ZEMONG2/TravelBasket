let kakapApimodule = {};

kakapApimodule.searchData = function (req, res) {
  var request = require("request");
  const keyword = req.body.keyword;
  const page = req.body.page;
  let kakaoOptions = {
    url: "https://dapi.kakao.com/v2/local/search/keyword.json", // target에 해당하는 것을 적기
    method: "GET",
    headers: {
      Authorization: "KakaoAK 0e3a92068774d4afdff22545fcd7af2f", //내 rest api
    },
    qs: {
      query: "대전 맛집", // 현재 책으로 검색할 것이라 책 제목을 적었다.
      query: keyword,
      //query: req.params.keyword,
      page: page, // 결과 페이지 번호
      size: 5, // 가져올 갯수
    },
    encoding: "UTF-8",
  };
  request(kakaoOptions, function (err, response, body) {
    if (!err && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
    }
  });
};
module.exports = kakapApimodule;
