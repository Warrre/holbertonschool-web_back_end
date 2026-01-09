const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      if (lines.length === 0) {
        console.log('Number of students: 0');
        resolve();
        return;
      }

      const header = lines[0].split(',');
      const students = lines.slice(1);

      console.log(`Number of students: ${students.length}`);

      const fieldMap = {};
      const fieldOrder = [];

      students.forEach((line) => {
        const parts = line.split(',');
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
        console.log(`Number of students in ${field}: ${info.count}. List: ${info.list.join(', ')}`);
      });

      resolve();
    });
  });
}

module.exports = countStudents;
