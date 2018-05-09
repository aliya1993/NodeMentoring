import config from "./config/config.json";
import { User, Product } from "./models";
import Importer from "./importer/Importer.js";
import DirWatcher from './dirwatcher/DirWatcher.js';
const readline = require('readline');

const input = process.stdin;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(config.name);

const user = new User();
const product = new Product();

const dirwatcher = new DirWatcher(500);
const importer = new Importer(dirwatcher);

const startImporter = (numberOfFiles) => {
  let count = 0;
  importer.on('done', (result) => {
    console.log('done');

    result.then((response) => {
      console.log('------------------------');
      console.log('file name: ' + response.filename)
      console.log(response.data)
    });
    if (count >= numberOfFiles - 1) {
      importer.stopImporting();
      input.removeAllListeners('data');
      rl.write('Uploading has been finished\r')
    }
    count++;
  });
  importer.startImporting(`${__dirname}\\data`, 5000);
}

rl.write('Enter number of files to upload\r');
input.on('data', (numberOfFiles) => {
  console.log(`Received: ${numberOfFiles}`);
  startImporter(numberOfFiles);
});