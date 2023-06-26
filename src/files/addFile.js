import { writeFile } from "fs/promises";

export const addFile = async (fileName) => {
  await writeFile(fileName, "", { flag: "wx" });
  console.log("file is created");
};
