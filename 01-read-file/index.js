const fs = require('fs'); //import fs module
const path = require('path');  //correct path

const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8'); //create new ReadStream
readStream.pipe(process.stdout)