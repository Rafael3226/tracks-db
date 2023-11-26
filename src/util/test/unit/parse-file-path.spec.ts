import { parseFilePath } from '../../parse-file-path';

describe('parseFilePath', () => {
  it('should parse file path correctly', () => {
    const filePath = '/path/to/your/file.txt';
    const expectedFileInfo = {
      directory: '\\path\\to\\your',
      filename: 'file',
      extension: 'txt',
    };

    const fileInfo = parseFilePath(filePath);

    expect(fileInfo).toEqual(expectedFileInfo);
  });

  it('should handle Windows file paths', () => {
    const filePath = 'C:\\path\\to\\your\\file.txt';
    const expectedFileInfo = {
      directory: 'C:\\path\\to\\your',
      filename: 'file',
      extension: 'txt',
    };

    const fileInfo = parseFilePath(filePath);

    expect(fileInfo).toEqual(expectedFileInfo);
  });

  it('should handle file paths with spaces', () => {
    const filePath = '/path/to/your/file with spaces.txt';
    const expectedFileInfo = {
      directory: '\\path\\to\\your',
      filename: 'file with spaces',
      extension: 'txt',
    };

    const fileInfo = parseFilePath(filePath);

    expect(fileInfo).toEqual(expectedFileInfo);
  });

  it('should handle file paths without extension', () => {
    const filePath = '/path/to/your/file_without_extension';
    const expectedFileInfo = {
      directory: '\\path\\to\\your',
      filename: 'file_without_extension',
      extension: '',
    };

    const fileInfo = parseFilePath(filePath);

    expect(fileInfo).toEqual(expectedFileInfo);
  });
});
