let fs = require('fs'); //import fs module
let path = require('path'); //correct path

fs.readdir(path.join(__dirname, 'secret-folder'), { // create folder path
  withFileTypes: true //  if the setting With file types is true or not specified, the function returns a list of file names.
}, (err, files) => {
  for (let file of files) {
    fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
      if (file.isFile()) {
        console.log(`${file.name.split('.')[0]} - ${file.name.split('.')[1]} - ${stats.size / 1000} kB`);
      }
    });
  }
});