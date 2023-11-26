import path from 'path';
import fs from 'fs';

export function getFilesFromPath(directoryPath) {
  const filePaths = [];

  function traverseDirectory(currentPath) {
    const files = fs.readdirSync(currentPath);

    files.forEach((file) => {
      const filePath = path.join(currentPath, file);

      if (fs.statSync(filePath).isDirectory()) {
        // Recursively traverse subdirectories
        traverseDirectory(filePath);
      } else {
        // Add file path to the list
        filePaths.push(filePath);
      }
    });
  }

  traverseDirectory(directoryPath);
  return filePaths;
}
