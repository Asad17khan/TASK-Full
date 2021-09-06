const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "CRUDDataBase",
});

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * From word_synonym";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const wordName = req.body.wordName;
  const fullName = req.body.fullName;
  const sqlInsert = "INSERT INTO word_synonym(wordName,fullName) VALUES (?,?)";
  db.query(sqlInsert, [wordName, fullName], (err, result) => {
    console.log(result);
  });
});

app.delete("/api/delete/:wordName", (req, res) => {
  const name = req.params.wordName;
  const sqlDelete = "DELETE FROM word_synonym WHERE wordName=?";
  db.query(sqlDelete, name, (err, result) => {
    if (err) console.log(err);
  });
});

app.put("/api/update", (req, res) => {
  const name = req.body.wordName;
  const review = req.body.fullName;
  const sqlUpdate = "UPDATE SET word_synonym fullName =? WHERE wordName= ?";
  db.query(sqlUpdate, [review, name], (err, result) => {
    if (err) console.log(err);
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
