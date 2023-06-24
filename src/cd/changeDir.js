import path from "node:path";
import fs from "node:fs";

export function changeDir(pathTo) {
  const targetPath = path.isAbsolute(pathTo) ? pathTo : path.resolve(pathTo);

  fs.stat(targetPath, (err, stats) => {
    if (err) throw err;

    if (stats.isDirectory()) {
      return targetPath;
    } else {
      console.log("Operation failed");
    }
  });
}
