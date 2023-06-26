import { access, constants } from "node:fs/promises";

import { createReadStream } from "node:fs";
import { stdout } from "node:process";

export const readContent = async (filePath) => {
  access(filePath, constants.F_OK) // check if file exists
    .then(() => {
      const readableStream = createReadStream(filePath, {
        encoding: "utf8",
      });

      readableStream.on("data", (chunk) => {
        const dataToWrite = chunk.toString();
        stdout.write(dataToWrite);
      });
      readableStream.on("end", () => {
        console.log("file is read");
      });
    })
    .catch((err) => console.log(err.message));
};
