import path from 'path';
import fs from 'fs/promises';
import { Stats } from 'fs';

const cwd = process.cwd();

const argv = process.argv.slice(2);

const filePath = argv[0] || '';

const home = path.join(cwd, filePath);
const homeURI = encodeURIComponent(home);

const decodedURI = decodeURIComponent(homeURI);

export const getFileURL = (pathURL?: string) => {
  const fullPathURL = path.join(decodedURI, pathURL || '');
  return fullPathURL;
};

type FileInfo =
  | {
      canAccess: false;
    }
  | { canAccess: true; fileInfo?: Stats };

export const getFileInfo = async (fileURL: string): Promise<FileInfo> => {
  try {
    await fs.access(fileURL, fs.constants.F_OK);
    const fileInfo = await fs.stat(fileURL);
    return {
      canAccess: true,
      fileInfo,
    };
  } catch {
    return {
      canAccess: false,
    };
  }
};

type SingleFileInfo = { name: string; type?: string; fileType?: string };

export const getFiles = async (pathURL?: string) => {
  const fullPathURL = getFileURL(pathURL);

  try {
    const files = await fs.readdir(fullPathURL);

    const fileWithTypes = await Promise.all(
      files.map(async (f) => {
        const fullDir = path.join(fullPathURL, f);
        const stats = await fs.stat(fullDir);

        const val: SingleFileInfo = { name: f };

        if (stats.isFile()) {
          val.type = 'file';
          const extName = path.extname(fullDir);
          val.fileType = extName;
        } else if (stats.isDirectory()) {
          val.type = 'dir';
        }

        return val;
      })
    );

    return fileWithTypes;
  } catch (err) {
    console.log(err);
  }
};

// getFiles(decodedURI);
