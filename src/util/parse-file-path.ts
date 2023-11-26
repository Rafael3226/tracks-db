import * as path from 'path';

interface FileInfo {
  directory: string;
  filename: string;
  extension: string;
}

export function parseFilePath(filePath: string): FileInfo | null {
  // Normalize the path to handle any platform-specific differences
  const normalizedPath = path.normalize(filePath);

  // Extract the directory, file name, and extension
  const directory = path.dirname(normalizedPath);
  const filenameWithExtension = path.basename(normalizedPath);
  const [filename, extension = ''] = filenameWithExtension.split('.');

  return {
    directory,
    filename,
    extension,
  };
}
