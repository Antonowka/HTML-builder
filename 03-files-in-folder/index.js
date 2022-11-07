const fs = require('fs'); //import fs module
const path = require('path'); //correct path


fs.readdir(path.join(__dirname, 'secret-folder'), { // create folder path
  withFileTypes: true //  if the setting With file types is true or not specified, the function returns a list of file names.
}, (error, files) => {
  for (let file of files) {
    fs.stat(path.join(__dirname, 'secret-folder', file.name), (error, stats) => {
      if (file.isFile()) {
        const fileName = file.name.split('.')[0];
        const fileExtension = file.name.split('.')[1];
        const fileSize = stats.size / 1000; // b -> kB
        const output = `${fileName} - ${fileExtension} - ${fileSize} kB`;
        console.log(output);
      }
    });
  }
});