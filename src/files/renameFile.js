import { access, constants } from "node:fs/promises";
import { rename } from "fs/promises";

export const renameFile = async (filePath, newName, currentDir) => {
  const newNamePath = join(currentDir, newName);

  access(filePath, constants.F_OK) // check if init file exists
    .then(() => {
      access(newNamePath, constants.F_OK) // check if new file exists
        .then(() => console.log("file with such name already exists"))
        .catch(() => {
          rename(filePath, newNamePath, (err) => console.log(err.message));
        });
    })
    .catch(() => console.log("failed to rename"));
};
