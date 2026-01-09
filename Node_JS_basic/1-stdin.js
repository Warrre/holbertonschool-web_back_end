process.stdout.write("Welcome to Holberton School, what is your name?\n");

process.stdin.setEncoding("utf8");

let responded = false;

process.stdin.on("data", (chunk) => {
  if (responded) return;
  const input = chunk.toString().split(/\r?\n/)[0].trim();
  process.stdout.write(`Your name is: ${input}\n`);
  responded = true;
  if (process.stdin.isTTY) {
    process.exit(0);
  }
});

process.stdin.on("end", () => {
  process.stdout.write("This important software is now closing\n");
});
