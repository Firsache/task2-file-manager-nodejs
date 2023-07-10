import { access, constants } from "node:fs/promises";

import { createReadStream, createWriteStream, rm } from "node:fs";
import { pipeline } from "node:stream/promises";

export const moveFile = async (oldFilePath, newFilePath) => {
  access(oldFilePath, constants.F_OK) // check if file exists
    .then(() => {
      access(newFilePath, constants.F_OK) // check if file doesn't exists
        .then(() => console.log("file with such name already exists"))
        .catch(async () => {
          const rs = createReadStream(oldFilePath);
          const ws = createWriteStream(newFilePath);
          await pipeline(rs, ws);

          await rm(oldFilePath, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log("File was deleted");
            }
          });
        });
    })
    .catch(() => console.log("failed to copy"));
};
