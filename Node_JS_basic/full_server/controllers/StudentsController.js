import readDatabase from "../utils";

class StudentsController {
  static getAllStudents(_request, response) {
    readDatabase(process.argv[2])
      .then((data) => {
        const output = ["This is the list of our students"];

        const fields = Object.keys(data).sort((a, b) =>
          a.toLowerCase().localeCompare(b.toLowerCase())
        );

        for (const field of fields) {
          const students = data[field];
          output.push(
            `Number of students in ${field}: ${
              students.length
            }. List: ${students.join(", ")}`
          );
        }

        response.status(200).send(output.join("\n"));
      })
      .catch(() => {
        response.status(500).send("Cannot load the database");
      });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;

    if (major !== "CS" && major !== "SWE") {
      return response.status(500).send("Major parameter must be CS or SWE");
    }

    return readDatabase(process.argv[2])
      .then((data) => {
        const students = data[major] || [];
        response.status(200).send(`List: ${students.join(", ")}`);
      })
      .catch(() => {
        response.status(500).send("Cannot load the database");
      });
  }
}

export default StudentsController;
