import config from "./config/config.json";
import { User, Product } from "./models";
import Importer from "./importer/Importer.js";
import DirWatcher from './dirwatcher/DirWatcher.js';

console.log(config.name);

const user = new User();
const product = new Product();

const dirwatcher = new DirWatcher(500);
const importer = new Importer(dirwatcher);

importer.on('done', (result) => {
  console.log('done');
  result.then((response) => {
    console.log('------------------------');
    console.log('file name: ' + response.filename)
    console.log(response.data)
  });
});

setTimeout(function () {
  importer.startImporting(`${__dirname}\\data`, 5000);
}, 60000);
importer.stopImporting();

importer.import(`${__dirname}\\data\\File1.csv`).then(res => { console.log('Predefined async:'); console.log(res) });;
console.log('Predefined sync:');
console.log(importer.importSync(`${__dirname}\\data\\File1.csv`));
