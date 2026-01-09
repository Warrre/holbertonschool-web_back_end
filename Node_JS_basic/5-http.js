const http = require('http');
const fs = require('fs');

const dbPath = process.argv[2];

function buildStudentsReport(data) {
  const lines = data.split('\n');
  const students = lines.slice(1);
  const validStudents = students
    .map((line) => line.trim())
    .filter((line) => line !== '')
    .map((line) => line.split(','))
    .filter((parts) => parts.length >= 4);

  const fields = {};
  validStudents.forEach((parts) => {
    const firstname = parts[0].trim();
    const field = parts[parts.length - 1].trim();
    if (!fields[field]) {
      fields[field] = [];
    }
    fields[field].push(firstname);
  });

  const out = [];
  out.push(`Number of students: ${validStudents.length}`);
  Object.keys(fields).forEach((field) => {
    const list = fields[field].join(', ');
    out.push(`Number of students in ${field}: ${fields[field].length}. List: ${list}`);
  });

  return out.join('\n');
}

const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.statusCode = 200;
    res.end('Hello Holberton School!');
    return;
  }

  if (req.url === '/students') {
    res.statusCode = 200;
    res.write('This is the list of our students\n');

    if (!dbPath) {
      res.end('Cannot load the database');
      return;
    }

    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) {
        res.end('Cannot load the database');
        return;
      }

      try {
        const report = buildStudentsReport(data);
        res.end(report);
      } catch (e) {
        res.end('Cannot load the database');
      }
    });
    return;
  }

  res.statusCode = 404;
  res.end('Not found');
});

app.listen(1245);

module.exports = app;
