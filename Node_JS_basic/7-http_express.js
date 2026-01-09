const express = require("express");
const countStudents = require("./3-read_file_async");

const database = process.argv[2];

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Holberton School!");
});

app.get("/students", (req, res) => {
  const databaseCSV = process.argv[2];
  const originalLog = console.log;
  let output = "";
  console.log = (msg) => {
    output += `${msg}\n`;
  };

  res.write("This is the list of our students\n");

  countStudents(databaseCSV)
    .then(() => {
      console.log = originalLog;
      res.end(output.trim());
    })
    .catch(() => {
      console.log = originalLog;
      res.end("Cannot load the database");
    });
});

app.listen(1245);

module.exports = app;
