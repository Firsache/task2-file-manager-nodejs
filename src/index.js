import readline from "readline";
import os from "os";
import { upDir } from "./cd/upDir.js";
import { changeDir } from "./cd/changeDir.js";
import { getList } from "./cd/list.js";
import { readContent } from "./files/read.js";
import { addFile } from "./files/addFile.js";
import { renameFile } from "./files/renameFile.js";
import { copyFile } from "./files/copyFile.js";
import { moveFile } from "./files/moveFile.js";
import { deleteFile } from "./files/deleteFile.js";
import { osOperations } from "./os/os.js";
import { hashFile } from "./hash/hash.js";

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
const bye = (userName) => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  readLine.close();
  process.exit();
};

welcome(userName);

const commands = {
  async cd(args) {
    try {
      const newDir = await changeDir(currentDir, args[0]);
      currentDir = newDir;
    } catch (error) {
      console.error(error);
    }
  },
  async up() {
    try {
      const parentDir = await upDir(currentDir);
      currentDir = parentDir;
    } catch (error) {
      console.error(error);
    }
  },
  async ls() {
    const tableOfFiles = await getList(currentDir);
    console.table(tableOfFiles);
  },
  async cat([filePath]) {
    await readContent(filePath);
  },
  async add([fileName]) {
    await addFile(fileName);
  },
  async rn([filePath, newName]) {
    await renameFile(filePath, newName, currentDir);
  },
  async cp([oldFilePath, newFilePath]) {
    await copyFile(oldFilePath, newFilePath);
  },
  async mv([oldFilePath, newFilePath]) {
    await moveFile(oldFilePath, newFilePath);
  },
  async rm([pathToDel]) {
    await deleteFile(pathToDel);
  },
  async os(args) {
    await osOperations(args);
  },
  async hash([filePath]) {
    await hashFile(filePath);
  },
};

readLine.prompt();
readLine.on("line", async (str) => {
  str = str.trim();
  if (str.toLowerCase() === ".exit") {
    bye(userName);
  }

  const [commandName, ...inputArgs] = str.split(" ");

  const command = commands[commandName];
  if (command) {
    await command(inputArgs);
    console.log(`You are currently in ${currentDir}`);
    readLine.prompt();
  } else console.log("Invalid input");
});

readLine.on("SIGINT", () => {
  bye(userName);
});
