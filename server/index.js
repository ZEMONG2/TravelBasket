const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const PORT = process.env.port || 8000;
const cors = require("cors");

const db = mysql.createPool({
  host: "210.114.22.116",
  user: "js_team_5",
  password: "tb123456",
  database: "js_team_5",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/select", (req, res) => {
  const sqlQuery = "SELECT * FROM test;";
  db.query(sqlQuery, (err, result) => {
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

app.post("/api/insert", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const id = req.body.id;
  const sqlQuery = "INSERT INTO test (title, content, id) VALUES (?,?,?)";
  db.query(sqlQuery, [title, content, id], (err, result) => {
    res.send("insert success!");
  });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
