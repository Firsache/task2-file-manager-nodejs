import { readFile } from "node:fs/promises";
import { access, constants } from "node:fs/promises";
import { resolve } from "node:path";
import { createHash } from "node:crypto";

export const hashFile = (pathToFile) => {
  const filePath = resolve(pathToFile);

  access(filePath, constants.F_OK) // check if file exists
    .then(() => {
      readFile(filePath) // read the file
        .then((data) => {
          dataToHash = data.toString();

          const hash = createHash("sha256").update(dataToHash).digest("hex");
          console.log(hash);
        })
        .catch((err) => console.log(err.message));
    })
    .catch((err) => console.log(err.message));
};
