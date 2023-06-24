import path from "node:path";
import fs from "node:fs";

export function upDir(currentDir) {
  const pathTo = path.resolve(path.dirname(currentDir));

  fs.stat(pathTo, (err, stats) => {
    if (err) throw err;

    if (stats.isDirectory()) {
      return pathTo;
    } else {
      console.log("Operation failed");
    }
  });
}
