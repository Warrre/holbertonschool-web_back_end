const http = require("http");
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

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  if (req.url === "/") {
    res.end("Hello Holberton School!");
    return;
  }

  if (req.url === "/students") {
    res.write("This is the list of our students\n");
    buildStudentsReport(database)
      .then((report) => {
        res.end(report);
      })
      .catch(() => {
        res.end("Cannot load the database");
      });
    return;
  }

  res.end("Hello Holberton School!");
});

app.listen(1245);

module.exports = app;
