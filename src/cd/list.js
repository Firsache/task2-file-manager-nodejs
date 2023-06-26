import { readdir } from "fs/promises";

export const getList = async (currentDir) => {
  const table = (await readdir(currentDir, { withFileTypes: true })).map(
    (listItem) => {
      const type = listItem.isDirectory() ? "Directory" : "File";
      return {
        name: listItem.name,
        type,
      };
    }
  );
  return table;
};
