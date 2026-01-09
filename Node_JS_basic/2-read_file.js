const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
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
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
