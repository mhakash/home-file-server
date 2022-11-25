import path from 'path';
import fs from 'fs/promises';

const cwd = process.cwd();

const argv = process.argv.slice(2);

const filePath = argv[0] || '';

const home = path.join(cwd, filePath);
const homeURI = encodeURIComponent(home);

const decodedURI = decodeURIComponent(homeURI);

export const getFiles = async (pathURL?: string) => {
  const fullPathURL = path.join(decodedURI, pathURL || '');

  try {
    const files = await fs.readdir(fullPathURL);

    const fileWithTypes = await Promise.all(
      files.map(async (f) => {
        const fullDir = path.join(fullPathURL, f);
        const stats = await fs.stat(fullDir);

        const val: { name: string; type?: string } = { name: f };

        if (stats.isFile()) {
          val['type'] = 'file';
        } else if (stats.isDirectory()) {
          val['type'] = 'dir';
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
