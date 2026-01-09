const express = require("express");
const fs = require("fs");

function buildStudentsReport(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(new Error("Cannot load the database"));
        return;
      }

      const lines = data
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      if (lines.length === 0) {
        resolve("Number of students: 0");
        return;
      }

      const header = lines[0].split(",");
      const students = lines.slice(1);

      const outputs = [];
      outputs.push(`Number of students: ${students.length}`);

      const fieldMap = {};
      const fieldOrder = [];

      students.forEach((line) => {
        const parts = line.split(",");
        if (parts.length >= header.length) {
          const firstName = parts[0];
          const field = parts[3];

          if (!fieldMap[field]) {
            fieldMap[field] = { count: 0, list: [] };
            fieldOrder.push(field);
          }
          fieldMap[field].count += 1;
          fieldMap[field].list.push(firstName);
        }
      });

      fieldOrder.forEach((field) => {
        const info = fieldMap[field];
        outputs.push(
          `Number of students in ${field}: ${
            info.count
          }. List: ${info.list.join(", ")}`
        );
      });

      resolve(outputs.join("\n"));
    });
  });
}

const database = process.argv[2];

const app = express();

app.get("/", (req, res) => {
  res.type("text/plain");
  res.send("Hello Holberton School!");
});

app.get("/students", (req, res) => {
  res.type("text/plain");
  buildStudentsReport(database)
    .then((report) => {
      res.send(`This is the list of our students\n${report}`);
    })
    .catch(() => {
      res.send("This is the list of our students\nCannot load the database");
    });
});

app.listen(1245);

module.exports = app;
