process.stdout.write("Welcome to Holberton School, what is your name?\n");

process.stdin.setEncoding("utf8");

process.stdin.on("data", (chunk) => {
  const input = chunk.toString().trim();
  if (input.length > 0) {
    process.stdout.write(`Your name is: ${input}\n`);
  } else {
    process.stdout.write("Your name is: \n");
  }
});

process.stdin.on("end", () => {
  process.stdout.write("This important software is now closing\n");
});

process.on("SIGINT", () => {
  process.stdout.write("This important software is now closing\n");
  process.exit(0);
});
