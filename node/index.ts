const express = require("express");
const app = express();

app.get("/", (_, res) => {
  getNames((data) => {
    res.send(`<h1>Full Cycle Rocks!</h1> <ul>` + data + `</ul>`);
  });
});

function getNames(callback) {
  const mysql = require("mysql").createConnection({ host: "db", user: "root", password: "root", database: "nodedb" });

  mysql.query("INSERT INTO PEOPLE (name) VALUES('Julio')");

  mysql.query("SELECT * FROM PEOPLE", function (err, result, fields) {
    var data = "";
    result.map((row) => {
      data = data + `<li>${row.name}</li>`;
    });
    return callback(data);
  });

  mysql.end();
}

app.listen(3000, () => {
  console.log("Server listening in: " + 3000);
});
