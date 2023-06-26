import path from "node:path";
import fs from "node:fs";

export const changeDir = (currentDir, pathTo) => {
  const targetPath = path.isAbsolute(pathTo)
    ? pathTo
    : path.join(currentDir, pathTo);
  console.log(`targetPath: ${targetPath}`);

  return new Promise((resolve, reject) => {
    fs.stat(targetPath, (err, stats) => {
      if (err) reject(err);

      if (stats.isDirectory()) {
        resolve(targetPath);
      } else {
        reject("Operation failed");
      }
    });
  });
};
