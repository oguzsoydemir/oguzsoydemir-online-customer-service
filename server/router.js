const express = require("express");
const router = express.Router();
const port = 8080;

const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "chat",
});

router.get("/", (request, response) => {
  response.send("Server açık ve çalışmaya devam ediyor");
});

router.get("/admin/select", (req, res) => {
  const { name, password } = req.query;
  const select_admin = `SELECT * FROM ADMIN WHERE NAME='${name}' AND PASSWORD=${password}`;
  db.query(select_admin, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      {
        return res.json({ data: result });
      }
    }
  });
});

module.exports = router;
