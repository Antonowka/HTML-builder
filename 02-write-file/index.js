const fs = require('fs');  //import fs module
const path = require('path');  //correct path
const {
  stdin,
  stdout
} = process;

const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));  //create new writeStream

stdout.write('\nHello, Stranger!\nWhere are you going?\n\n');
stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') 
  process.exit();
  writeStream.write(data.toString());
});

process.on('exit', () => stdout.write('\nGood luck and have a good way!\n '));
process.on('SIGINT', process.exit);