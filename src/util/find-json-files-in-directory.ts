import fs from "fs";
import path from "path";

export function findJsonFilesInDirectory(directoryPath: string): string[] {
  // Ensure the directory path is normalized
  const normalizedPath = path.normalize(directoryPath);

  try {
    // Read the contents of the directory
    const files = fs.readdirSync(normalizedPath);

    // Filter out only the JSON files
    const jsonFiles = files.filter((file) => {
      const filePath = path.join(normalizedPath, file);
      // Check if the file is a JSON file
      return (
        fs.statSync(filePath).isFile() && path.extname(filePath) === ".json"
      );
    });

    return jsonFiles;
  } catch (error) {
    // Handle errors, e.g., directory not found
    console.error(`Error reading directory: ${error.message}`);
    return [];
  }
}
