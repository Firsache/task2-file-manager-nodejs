import { rm } from "node:fs";

export const deleteFile = async (pathToDel) => {
  await rm(pathToDel, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("File was deleted");
    }
  });
};
