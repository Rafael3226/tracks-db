import * as fs from 'fs';

// Function to read and parse a JSON file
export function readJsonFile(filePath: string): object[] | null {
  try {
    // Read the contents of the JSON file
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Parse the JSON content
    const jsonData = JSON.parse(fileContent);

    return jsonData;
  } catch (error) {
    console.error(`Error reading JSON file: ${filePath}`);
    console.error(error);
    return null;
  }
}
