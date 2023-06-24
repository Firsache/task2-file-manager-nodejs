import path from "node:path";
import fs from "node:fs";

export function upDir(currentDir) {
  const pathTo = path.resolve(path.dirname(currentDir));
  console.log(`pathTo: ${pathTo}`);

  fs.stat(pathTo, (err, stats) => {
    if (err) throw err;

    if (stats.isDirectory()) {
      console.log("TRUE");
      return pathTo;
    } else {
      console.log("Operation failed");
    }
  });
}
