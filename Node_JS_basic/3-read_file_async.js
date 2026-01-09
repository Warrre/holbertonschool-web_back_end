const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      try {
        const lines = data.split('\n');
        const students = lines.slice(1);
        const validStudents = students
          .map((line) => line.trim())
          .filter((line) => line !== '')
          .map((line) => line.split(','))
          .filter((parts) => parts.length >= 4);

        console.log(`Number of students: ${validStudents.length}`);

        const fields = {};
        validStudents.forEach((parts) => {
          const firstname = parts[0].trim();
          const field = parts[parts.length - 1].trim();
          if (!fields[field]) {
            fields[field] = [];
          }
          fields[field].push(firstname);
        });

        Object.keys(fields).forEach((field) => {
          const list = fields[field].join(', ');
          console.log(`Number of students in ${field}: ${fields[field].length}. List: ${list}`);
        });

        resolve();
      } catch (e) {
        reject(new Error('Cannot load the database'));
      }
    });
  });
}

module.exports = countStudents;
