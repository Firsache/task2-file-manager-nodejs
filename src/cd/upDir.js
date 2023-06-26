import path from "node:path";
import fs from "node:fs";

export const upDir = (currentDir) => {
  const pathTo = path.resolve(path.dirname(currentDir));
  const isRootDir = currentDir.split("\\");
  const parentDir = isRootDir.length > 1 ? pathTo : currentDir;

  return new Promise((resolve, reject) => {
    fs.stat(parentDir, (err, stats) => {
      if (err) reject(err);

      if (stats.isDirectory()) {
        resolve(parentDir);
      } else {
        reject("Operation failed");
      }
    });
  });
};
