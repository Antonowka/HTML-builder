const path = require('path'); //correct path
const {
  readdir,
  copyFile,
  rm,
  mkdir
} = require('fs/promises'); //import fs modules

const folder = path.join(__dirname, 'files'); // path to main folder
const copyFolder = path.join(__dirname, 'files-copy'); //path to copy folder

async function copyDirectory(data, target) {
  try {
    await rm(target, {
      recursive: true,
      force: true
    });
    await mkdir(target, {
      recursive: true
    });
    const files = await readdir(data, {
      withFileTypes: true
    });
    for (const file of files) {
      await copyFile(path.join(data, file.name),path.join(target, file.name));
    }
  } catch (error) {
    console.log(error.message);
  }
}

copyDirectory(folder, copyFolder);