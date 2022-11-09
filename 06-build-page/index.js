const fs = require('fs'); //import fs modules
const promises = require('fs/promises') //import fs/promises modules
const path = require('path'); //correct path
// const folder = path.join(__dirname, 'project-dist'); // path to project-dist folder
const styles = path.join(__dirname, 'styles'); // path to project-dist folder
const bundle = path.join(__dirname, 'project-dist', 'style.css');  // path to output bundle file
const writeStream = fs.createWriteStream(bundle);
const {
  readdir,
  copyFile,
  rm,
  mkdir
} = require('fs/promises'); //import fs modules

// Create HTML file
(async function createHTML() {
  const template = path.join(__dirname, 'template.html'); // path to template
  const components = path.join(__dirname, 'components'); // path to components

  let templateData = await promises.readFile(template, {
    encoding: 'utf-8'
  });

  fs.readdir(
    components, {
      withFileTypes: true
    },
    (error, files) => {
      files.forEach(file => {
        if (file.name.split('.')[1] === 'html' && file.isFile()) {

          fs.createReadStream(path.join(__dirname, 'components', file.name), {
            encoding: 'utf-8'
          }).on('data', data => {
            templateData = templateData.replace(`{{${file.name.split('.')[0]}}}`, data);
            fs.writeFile(
              path.join(__dirname, 'project-dist', 'index.html'),
              templateData,
              (error) => {
                if (error) throw error;
              }
            );
          });
        }
      });
    });
})();


// Merged css. Folder styles
fs.readdir(styles, {
  withFileTypes: true  // if the setting With file types is true or not specified, the function returns a list of file names.
}, (error, files) => {
  for (let file of files) {
    if (file.isFile() && file.name.split('.')[1] === 'css') {
      const filePath = path.join(styles, file.name);
      const readStream = fs.createReadStream(filePath, 'utf-8');
      let result = '';
      
      readStream.on('data', chunk => result += chunk);
      readStream.on('end', () => writeStream.write(result));
    }
  }
});


// Copy folder assets
const assetsFolder = path.join(__dirname, 'assets'); // path to main folder
const copyFolder = path.join(__dirname, 'project-dist', 'assets'); //path to copy folder

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

copyDirectory(assetsFolder, copyFolder);