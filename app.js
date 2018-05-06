import config from "./config/config.json"
import { User, Product } from "./models"
import Importer from "./importer/Importer.js"
import DirWatcher from './dirwatcher/DirWatcher.js'

console.log(config.name);
const user = new User();
const product = new Product();
const dirwatcher = new DirWatcher();
dirwatcher.watch("D:/Projects/NodeMentoring/NodeMentoring/data", 1000);
const importer = new Importer(dirwatcher);
dirwatcher.on("changed", (path) => {
  importer.import(path).then(response => {
    console.log("------------------------");
    console.log("file name: " + response.filename)
    console.log(response.data);
  })
});

