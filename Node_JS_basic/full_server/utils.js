import fs from 'fs';

export default function readDatabase(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const lines = data
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      if (lines.length === 0) {
        resolve({});
        return;
      }

      const header = lines[0].split(',');
      const students = lines.slice(1);

      const fieldMap = {};

      students.forEach((line) => {
        const parts = line.split(',');
        if (parts.length >= header.length) {
          const firstName = parts[0];
          const field = parts[3];
          if (!fieldMap[field]) {
            fieldMap[field] = [];
          }
          fieldMap[field].push(firstName);
        }
      });

      resolve(fieldMap);
    });
  });
}
