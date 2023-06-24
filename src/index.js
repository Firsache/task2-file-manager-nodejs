import readline from "readline";
import os from "os";
import { upDir } from "./cd/upDir.js";
import { changeDir } from "./cd/changeDir.js";

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

const homeDir = os.homedir();
let currentDir = homeDir;

const args = process.argv.filter((arg) => arg.startsWith("--username="));

const defaultName =
  args.length > 0
    ? args[0].replace("--username=", " ").trim()
    : "AnonymousDeveloper";

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
  async cd(args) {
    console.log(args);
    const newDir = await changeDir(args[0]);
    // console.log(newDir);
    // process.chdir(parentPath);
    currentDir = newDir;
  },
  up() {
    const parentDir = upDir(currentDir);
    console.log(parentDir);
    currentDir = parentDir;
  },
  ls() {
    // вывести содержимое папки
  },
};

readLine.prompt();
readLine.on("line", (str) => {
  str = str.trim();
  // console.log(`str ${str}`);

  const [commandName, ...inputArgs] = str.split(" ");
  //   console.log(`commandName ${commandName}`);
  //   console.log(`inputArgs ${inputArgs}`);

  const command = commands[commandName];
  if (command && !inputArgs.length) {
    command();
    // const curDir = process.cwd();
    // console.log(curDir);
    console.log(`You are currently in ${currentDir}`);
    readLine.prompt();
  } else if (command && inputArgs.length) {
    command(inputArgs);
    console.log(`You are currently in ${currentDir}`);
    readLine.prompt();
  } else console.log("Invalid input");
});

readLine.on("SIGINT", () => {
  buy(userName);
  readLine.close();
  process.exit();
});
