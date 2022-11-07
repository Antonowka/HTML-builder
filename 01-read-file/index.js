let fs = require('fs'); //import fs module
let path = require('path');  //correct path

let readStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8'); //create new ReadStream
readStream.pipe(process.stdout)