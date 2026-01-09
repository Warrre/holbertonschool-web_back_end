import fs from 'fs/promises';

const readDatabase = (filePath) =>
  fs.readFile(filePath, 'utf8').then((data) => {
    const lines = data.split('\n');
    const studentEntries = lines.slice(1).filter((line) => line.trim());

    const fieldToFirstNames = {};

    for (const entry of studentEntries) {
      const fields = entry.split(',');
      if (fields.length >= 4) {
        const firstName = fields[0].trim();
        const field = fields[3].trim();

        if (!fieldToFirstNames[field]) {
          fieldToFirstNames[field] = [];
        }

        fieldToFirstNames[field].push(firstName);
      }
    }

    return fieldToFirstNames;
  });

export default readDatabase;
