const http = require("http");
const fs = require("fs");

const http = require("http");
const countStudents = require("./3-read_file_async");

const app = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  if (req.url === "/") {
    res.end("Hello Holberton School!");
    return;
  }
  if (req.url === "/students") {
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
  }
});

app.listen(1245);

module.exports = app;
module.exports = app;
