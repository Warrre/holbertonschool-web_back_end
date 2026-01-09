import readDatabase from "../utils.js";

class StudentsController {
  static getAllStudents(req, res) {
    const dbPath = process.argv[2];
    readDatabase(dbPath)
      .then((fieldMap) => {
        const fields = Object.keys(fieldMap).sort((a, b) =>
          a.toLowerCase().localeCompare(b.toLowerCase())
        );
        const lines = ["This is the list of our students"];
        fields.forEach((field) => {
          const list = fieldMap[field];
          lines.push(
            `Number of students in ${field}: ${list.length}. List: ${list.join(
              ", "
            )}`
          );
        });
        res.status(200).send(lines.join("\n"));
      })
      .catch(() => {
        res.status(500).send("Cannot load the database");
      });
  }

  static getAllStudentsByMajor(req, res) {
    const { major } = req.params;
    if (major !== "CS" && major !== "SWE") {
      res.status(500).send("Major parameter must be CS or SWE");
      return;
    }
    const dbPath = process.argv[2];
    readDatabase(dbPath)
      .then((fieldMap) => {
        const list = fieldMap[major] || [];
        res.status(200).send(`List: ${list.join(", ")}`);
      })
      .catch(() => {
        res.status(500).send("Cannot load the database");
      });
  }
}

export default StudentsController;
