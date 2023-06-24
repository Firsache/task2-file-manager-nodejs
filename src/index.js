import readline from "readline";
import os from "os";

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

const homeDir = os.homedir();

const args = process.argv.filter((arg) => arg.startsWith("--username="));
const defaultName = args[0].replace("--username=", " ").trim();

const userName =
  args.length > 1
    ? args[args.length - 1].replace("--username=", " ").trim()
    : defaultName;

const welcome = (userName) => {
  console.log(`Welcome to the File Manager, ${userName}!`);
  console.log(`You are currently in ${homeDir}`);
};
const buy = (userName) => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
};

welcome(userName);

const commands = {
  exit() {
    buy(userName);
    readLine.close();
    process.exit();
  },
};

readLine.prompt();
readLine.on("line", (str) => {
  str = str.trim();
  const currentDir = "need to find it";

  const command = commands[str];
  if (command) {
    command();
    console.log(`You are currently in ${currentDir}`);
  } else console.log("Operation failed");
});

readLine.on("SIGINT", () => {
  buy(userName);
  readLine.close();
  process.exit();
});
