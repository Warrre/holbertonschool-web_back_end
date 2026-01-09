const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n');
    const students = lines.slice(1);
    const validStudents = students.filter((line) => line.trim() !== '');
    const total = validStudents.length;

    console.log(`Number of students: ${total}`);

    const fields = {};
    validStudents.forEach((line) => {
      const parts = line.split(',');
      const firstname = parts[0].trim();
      const field = parts[parts.length - 1].trim();
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstname);
    });

    for (const field in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, field)) {
        const list = fields[field].join(', ');
        console.log(`Number of students in ${field}: ${fields[field].length}. List: ${list}`);
      }
    }
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
