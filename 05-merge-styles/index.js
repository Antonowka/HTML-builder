const fs = require('fs');  //correct path
const path = require('path');  //import fs modules
const folder = path.join(__dirname, 'styles');  // path to style files 
const bundle = path.join(__dirname, 'project-dist', 'bundle.css');  // path to output bundle file

const writeStream = fs.createWriteStream(bundle);

fs.readdir(folder, {
  withFileTypes: true  // if the setting With file types is true or not specified, the function returns a list of file names.
}, (error, files) => {
  for (let file of files) {
    if (file.isFile() && file.name.split('.')[1] === 'css') {
      const filePath = path.join(folder, file.name);
      const readStream = fs.createReadStream(filePath, 'utf-8');
      let result = '';
      
      readStream.on('data', chunk => result += chunk);
      readStream.on('end', () => writeStream.write(result));
    }
  }
});